use base64::{engine::general_purpose::STANDARD as BASE64, Engine as _};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use sherlock_nsf_parser::{BucketDescriptorBlock, Database, ResolvedNote};
use std::collections::BTreeMap;
use std::io::{Cursor, Write};
use wasm_bindgen::prelude::*;
use zip::write::FileOptions;
use zip::{CompressionMethod, ZipWriter};

#[derive(Debug, Clone, Deserialize)]
#[serde(default)]
struct ExportOptions {
    json: bool,
    eml: bool,
    mbox: bool,
    attachments: bool,
    csv: bool,
}

impl Default for ExportOptions {
    fn default() -> Self {
        Self {
            json: true,
            eml: true,
            mbox: true,
            attachments: true,
            csv: true,
        }
    }
}

#[derive(Serialize)]
struct Manifest<'a> {
    app: &'static str,
    parser: &'static str,
    source_file: &'a str,
    source_size_bytes: usize,
    source_sha256: String,
    generated_at_utc: String,
    notes_identity_verified: usize,
    document_notes_identity_verified: usize,
    notes_unresolved: u64,
    bucket_slot_entries: u64,
    file_position_entries: u64,
    exports: Vec<&'static str>,
    warnings: Vec<&'static str>,
}

#[derive(Serialize)]
struct AttachmentMeta {
    name: String,
    size_bytes: usize,
}

#[derive(Serialize)]
struct JsonField {
    name: String,
    name_id: u16,
    type_flags: u16,
    kind: String,
    rendered: String,
    raw_base64: String,
}

#[derive(Serialize)]
struct JsonNote {
    note_id_hex: String,
    note_id: u32,
    note_class: u16,
    is_document: bool,
    unid: String,
    file_offset: u64,
    fields: Vec<JsonField>,
    body_text: String,
    attachments: Vec<AttachmentMeta>,
}

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn convert_nsf(
    bytes: &[u8],
    original_name: &str,
    formats_json: &str,
) -> Result<Vec<u8>, JsValue> {
    if bytes.is_empty() {
        return Err(js_error("Le fichier est vide."));
    }

    let options: ExportOptions = if formats_json.trim().is_empty() {
        ExportOptions::default()
    } else {
        serde_json::from_str(formats_json)
            .map_err(|e| js_error(&format!("Options d’export invalides : {e}")))?
    };

    if !(options.json || options.eml || options.mbox || options.attachments || options.csv) {
        return Err(js_error("Sélectionne au moins un format d’export."));
    }

    let db = Database::open(bytes)
        .map_err(|e| js_error(&format!("Impossible d’ouvrir ce NSF : {e}")))?;
    let enumeration = db
        .enumerate_notes()
        .map_err(|e| js_error(&format!("Erreur pendant l’énumération des notes : {e}")))?;
    let bdb = db
        .bucket_descriptor_block()
        .map_err(|e| js_error(&format!("Impossible de lire la table des champs : {e}")))?;

    let mut output = Cursor::new(Vec::<u8>::new());
    let mut zip = ZipWriter::new(&mut output);
    let file_options = FileOptions::default().compression_method(CompressionMethod::Deflated);

    let mut exports = Vec::new();
    if options.json {
        exports.push("JSON");
    }
    if options.eml {
        exports.push("EML");
    }
    if options.mbox {
        exports.push("MBOX");
    }
    if options.attachments {
        exports.push("pièces jointes");
    }
    if options.csv {
        exports.push("CSV");
    }

    let sha = hex::encode(Sha256::digest(bytes));
    let generated_at = js_sys::Date::new_0()
        .to_iso_string()
        .as_string()
        .unwrap_or_else(|| "unknown".to_string());

    let mut warnings = vec![
        "sherlock-nsf-parser est en pré-1.0 : certains anciens variants NSF peuvent être partiellement couverts.",
        "Les NSF ou éléments chiffrés ne peuvent pas être déchiffrés par la version actuelle du parseur.",
    ];
    if enumeration.unresolved > 0 {
        warnings.push("Certaines entrées n’ont pas pu être résolues ; le compteur exact figure dans ce manifeste.");
    }

    let manifest = Manifest {
        app: "NSF Web Converter",
        parser: "sherlock-nsf-parser 0.1.0",
        source_file: original_name,
        source_size_bytes: bytes.len(),
        source_sha256: sha,
        generated_at_utc: generated_at,
        notes_identity_verified: enumeration.notes.len(),
        document_notes_identity_verified: enumeration
            .notes
            .iter()
            .filter(|note| note.header.is_document())
            .count(),
        notes_unresolved: enumeration.unresolved,
        bucket_slot_entries: enumeration.bucket_slot_total,
        file_position_entries: enumeration.file_position_total,
        exports,
        warnings,
    };

    zip.start_file("manifest.json", file_options)
        .map_err(zip_error)?;
    serde_json::to_writer_pretty(&mut zip, &manifest)
        .map_err(|e| js_error(&format!("Erreur JSON : {e}")))?;

    if options.json {
        write_json_export(&mut zip, file_options, &db, bdb.as_ref(), &enumeration.notes)?;
    }

    if options.csv {
        write_csv_export(&mut zip, file_options, &db, bdb.as_ref(), &enumeration.notes)?;
    }

    if options.mbox {
        write_mbox_export(&mut zip, file_options, &db, bdb.as_ref(), &enumeration.notes)?;
    }

    if options.eml {
        write_eml_export(&mut zip, file_options, &db, bdb.as_ref(), &enumeration.notes)?;
    }

    if options.attachments {
        write_attachment_export(&mut zip, file_options, &db, &enumeration.notes)?;
    }

    zip.finish().map_err(zip_error)?;
    Ok(output.into_inner())
}

fn write_json_export(
    zip: &mut ZipWriter<&mut Cursor<Vec<u8>>>,
    options: FileOptions,
    db: &Database<'_>,
    bdb: Option<&BucketDescriptorBlock>,
    notes: &[ResolvedNote],
) -> Result<(), JsValue> {
    zip.start_file("json/notes.json", options).map_err(zip_error)?;
    zip.write_all(b"[\n").map_err(io_error)?;

    for (index, note) in notes.iter().enumerate() {
        if index > 0 {
            zip.write_all(b",\n").map_err(io_error)?;
        }

        let fields = extract_json_fields(db, bdb, note);
        let (body_text, attachments) = match db.note_content(note) {
            Some(content) => {
                let metadata = content
                    .attachments
                    .iter()
                    .map(|att| AttachmentMeta {
                        name: att.name.clone(),
                        size_bytes: att.data.len(),
                    })
                    .collect();
                (content.body_text, metadata)
            }
            None => (String::new(), Vec::new()),
        };

        let json_note = JsonNote {
            note_id_hex: format!("0x{:08X}", note.rrv_identifier),
            note_id: note.rrv_identifier,
            note_class: note.header.note_class,
            is_document: note.header.is_document(),
            unid: note.header.unid_hex(),
            file_offset: note.file_offset,
            fields,
            body_text,
            attachments,
        };

        let data = serde_json::to_vec_pretty(&json_note)
            .map_err(|e| js_error(&format!("Erreur JSON : {e}")))?;
        zip.write_all(&data).map_err(io_error)?;
    }

    zip.write_all(b"\n]\n").map_err(io_error)?;
    Ok(())
}

fn write_csv_export(
    zip: &mut ZipWriter<&mut Cursor<Vec<u8>>>,
    options: FileOptions,
    db: &Database<'_>,
    bdb: Option<&BucketDescriptorBlock>,
    notes: &[ResolvedNote],
) -> Result<(), JsValue> {
    zip.start_file("csv/notes.csv", options).map_err(zip_error)?;
    zip.write_all(b"note_id,unid,note_class,is_document,form,subject,from,to,cc,date,attachment_count,body_chars\n")
        .map_err(io_error)?;

    for note in notes {
        let fields = extract_fields(db, bdb, note);
        let body_and_count = db
            .note_content(note)
            .map(|c| (c.body_text.len(), c.attachments.len()))
            .unwrap_or((0, 0));

        let row = [
            format!("0x{:08X}", note.rrv_identifier),
            note.header.unid_hex(),
            format!("0x{:04X}", note.header.note_class),
            note.header.is_document().to_string(),
            field_first(&fields, &["Form"]).unwrap_or_default(),
            field_first(&fields, &["Subject"]).unwrap_or_default(),
            field_first(&fields, &["From", "Principal", "INetFrom"]).unwrap_or_default(),
            field_first(&fields, &["SendTo", "To"]).unwrap_or_default(),
            field_first(&fields, &["CopyTo", "Cc"]).unwrap_or_default(),
            field_first(
                &fields,
                &["PostedDate", "DeliveredDate", "Created", "$Created"],
            )
            .unwrap_or_default(),
            body_and_count.1.to_string(),
            body_and_count.0.to_string(),
        ];

        let mut line = String::new();
        for (i, value) in row.iter().enumerate() {
            if i > 0 {
                line.push(',');
            }
            line.push_str(&csv_escape(value));
        }
        line.push('\n');
        zip.write_all(line.as_bytes()).map_err(io_error)?;
    }
    Ok(())
}

fn write_mbox_export(
    zip: &mut ZipWriter<&mut Cursor<Vec<u8>>>,
    options: FileOptions,
    db: &Database<'_>,
    bdb: Option<&BucketDescriptorBlock>,
    notes: &[ResolvedNote],
) -> Result<(), JsValue> {
    zip.start_file("mbox/messages.mbox", options)
        .map_err(zip_error)?;

    for note in notes {
        if !note.header.is_document() {
            continue;
        }
        let fields = extract_fields(db, bdb, note);
        let eml = build_eml(db, note, &fields);
        zip.write_all(b"From MAILER-DAEMON Thu Jan 01 00:00:00 1970\r\n")
            .map_err(io_error)?;
        zip.write_all(&mbox_escape(&eml)).map_err(io_error)?;
        zip.write_all(b"\r\n\r\n").map_err(io_error)?;
    }
    Ok(())
}

fn write_eml_export(
    zip: &mut ZipWriter<&mut Cursor<Vec<u8>>>,
    options: FileOptions,
    db: &Database<'_>,
    bdb: Option<&BucketDescriptorBlock>,
    notes: &[ResolvedNote],
) -> Result<(), JsValue> {
    let mut document_index = 0usize;
    for note in notes {
        if !note.header.is_document() {
            continue;
        }
        document_index += 1;
        let fields = extract_fields(db, bdb, note);
        let subject = field_first(&fields, &["Subject"]).unwrap_or_else(|| "sans objet".to_string());
        let filename = format!(
            "eml/{:06}_{}_{}.eml",
            document_index,
            note.rrv_identifier,
            safe_filename(&subject, 60)
        );
        zip.start_file(filename, options).map_err(zip_error)?;
        let eml = build_eml(db, note, &fields);
        zip.write_all(&eml).map_err(io_error)?;
    }
    Ok(())
}

fn write_attachment_export(
    zip: &mut ZipWriter<&mut Cursor<Vec<u8>>>,
    options: FileOptions,
    db: &Database<'_>,
    notes: &[ResolvedNote],
) -> Result<(), JsValue> {
    for note in notes {
        if let Some(content) = db.note_content(note) {
            for (index, att) in content.attachments.iter().enumerate() {
                let filename = safe_filename(&att.name, 120);
                let path = format!(
                    "attachments/{:08X}/{:03}_{}",
                    note.rrv_identifier,
                    index + 1,
                    filename
                );
                zip.start_file(path, options).map_err(zip_error)?;
                zip.write_all(att.data.as_ref()).map_err(io_error)?;
            }
        }
    }
    Ok(())
}

fn extract_json_fields(
    db: &Database<'_>,
    bdb: Option<&BucketDescriptorBlock>,
    note: &ResolvedNote,
) -> Vec<JsonField> {
    db.note_items(note)
        .into_iter()
        .map(|item| {
            let (name, kind, rendered) = if let Some(bdb) = bdb {
                let name = bdb
                    .name(item.name_id)
                    .map(str::to_owned)
                    .unwrap_or_else(|| format!("field_{}", item.name_id));
                let field_kind = bdb.field_kind(item.name_id);
                (name, field_kind.label().to_string(), item.render(field_kind))
            } else {
                (
                    format!("field_{}", item.name_id),
                    "UNKNOWN".to_string(),
                    item.display_value(),
                )
            };

            JsonField {
                name,
                name_id: item.name_id,
                type_flags: item.type_flags,
                kind,
                rendered,
                raw_base64: BASE64.encode(item.value),
            }
        })
        .collect()
}

fn extract_fields(
    db: &Database<'_>,
    bdb: Option<&BucketDescriptorBlock>,
    note: &ResolvedNote,
) -> BTreeMap<String, Vec<String>> {
    let mut fields: BTreeMap<String, Vec<String>> = BTreeMap::new();

    for item in db.note_items(note) {
        let (name, value) = if let Some(bdb) = bdb {
            let name = bdb
                .name(item.name_id)
                .map(str::to_owned)
                .unwrap_or_else(|| format!("field_{}", item.name_id));
            let kind = bdb.field_kind(item.name_id);
            (name, item.render(kind))
        } else {
            (format!("field_{}", item.name_id), item.display_value())
        };

        fields.entry(name).or_default().push(value);
    }
    fields
}

fn build_eml(
    db: &Database<'_>,
    note: &ResolvedNote,
    fields: &BTreeMap<String, Vec<String>>,
) -> Vec<u8> {
    let from = field_first(fields, &["From", "Principal", "INetFrom"])
        .unwrap_or_else(|| "unknown@lotus.local".to_string());
    let to = field_first(fields, &["SendTo", "To"]).unwrap_or_default();
    let cc = field_first(fields, &["CopyTo", "Cc"]).unwrap_or_default();
    let bcc = field_first(fields, &["BlindCopyTo", "Bcc"]).unwrap_or_default();
    let subject = field_first(fields, &["Subject"]).unwrap_or_else(|| "(sans objet)".to_string());
    let form = field_first(fields, &["Form"]).unwrap_or_default();
    let lotus_date = field_first(
        fields,
        &["PostedDate", "DeliveredDate", "Created", "$Created"],
    )
    .unwrap_or_default();
    let msgid = field_first(fields, &["$MessageID", "MessageID"])
        .unwrap_or_else(|| format!("<nsf-{:08X}@local.invalid>", note.rrv_identifier));

    let content = db.note_content(note);
    let body = content
        .as_ref()
        .map(|c| c.body_text.as_str())
        .unwrap_or("");
    let attachments = content
        .as_ref()
        .map(|c| c.attachments.as_slice())
        .unwrap_or(&[]);

    let mut out = Vec::<u8>::new();
    push_header(&mut out, "From", &from);
    if !to.is_empty() {
        push_header(&mut out, "To", &to);
    }
    if !cc.is_empty() {
        push_header(&mut out, "Cc", &cc);
    }
    if !bcc.is_empty() {
        push_header(&mut out, "Bcc", &bcc);
    }
    push_header(&mut out, "Subject", &encode_header(&subject));
    push_header(&mut out, "Message-ID", &msgid);
    push_header(
        &mut out,
        "X-Lotus-Note-ID",
        &format!("0x{:08X}", note.rrv_identifier),
    );
    if !form.is_empty() {
        push_header(&mut out, "X-Lotus-Form", &form);
    }
    if !lotus_date.is_empty() {
        push_header(&mut out, "X-Lotus-Date", &lotus_date);
    }
    out.extend_from_slice(b"MIME-Version: 1.0\r\n");

    if attachments.is_empty() {
        out.extend_from_slice(b"Content-Type: text/plain; charset=UTF-8\r\n");
        out.extend_from_slice(b"Content-Transfer-Encoding: 8bit\r\n\r\n");
        out.extend_from_slice(to_crlf(body).as_bytes());
        out.extend_from_slice(b"\r\n");
        return out;
    }

    let boundary = format!("----nsf-web-converter-{:08X}", note.rrv_identifier);
    out.extend_from_slice(
        format!("Content-Type: multipart/mixed; boundary=\"{}\"\r\n\r\n", boundary).as_bytes(),
    );

    out.extend_from_slice(format!("--{}\r\n", boundary).as_bytes());
    out.extend_from_slice(b"Content-Type: text/plain; charset=UTF-8\r\n");
    out.extend_from_slice(b"Content-Transfer-Encoding: 8bit\r\n\r\n");
    out.extend_from_slice(to_crlf(body).as_bytes());
    out.extend_from_slice(b"\r\n");

    for att in attachments {
        let filename = safe_filename(&att.name, 120);
        out.extend_from_slice(format!("--{}\r\n", boundary).as_bytes());
        out.extend_from_slice(b"Content-Type: application/octet-stream\r\n");
        out.extend_from_slice(b"Content-Transfer-Encoding: base64\r\n");
        out.extend_from_slice(
            format!("Content-Disposition: attachment; filename=\"{}\"\r\n\r\n", header_safe(&filename))
                .as_bytes(),
        );
        let encoded = BASE64.encode(att.data.as_ref());
        for chunk in encoded.as_bytes().chunks(76) {
            out.extend_from_slice(chunk);
            out.extend_from_slice(b"\r\n");
        }
    }

    out.extend_from_slice(format!("--{}--\r\n", boundary).as_bytes());
    out
}

fn field_first(fields: &BTreeMap<String, Vec<String>>, names: &[&str]) -> Option<String> {
    for wanted in names {
        for (name, values) in fields {
            if name.eq_ignore_ascii_case(wanted) {
                let nonempty: Vec<&str> = values
                    .iter()
                    .map(String::as_str)
                    .filter(|v| !v.trim().is_empty())
                    .collect();
                if !nonempty.is_empty() {
                    return Some(nonempty.join(", "));
                }
            }
        }
    }
    None
}

fn push_header(out: &mut Vec<u8>, name: &str, value: &str) {
    out.extend_from_slice(name.as_bytes());
    out.extend_from_slice(b": ");
    out.extend_from_slice(header_safe(value).as_bytes());
    out.extend_from_slice(b"\r\n");
}

fn encode_header(value: &str) -> String {
    if value.is_ascii() {
        header_safe(value)
    } else {
        format!("=?UTF-8?B?{}?=", BASE64.encode(value.as_bytes()))
    }
}

fn header_safe(value: &str) -> String {
    value.replace('\r', " " ).replace('\n', " " ).trim().to_string()
}

fn to_crlf(value: &str) -> String {
    value
        .replace("\r\n", "\n")
        .replace('\r', "\n")
        .replace('\n', "\r\n")
}

fn mbox_escape(eml: &[u8]) -> Vec<u8> {
    let text = String::from_utf8_lossy(eml)
        .replace("\r\n", "\n")
        .replace('\r', "\n");
    let mut out = String::new();
    for line in text.split('\n') {
        if line.starts_with("From ") {
            out.push('>');
        }
        out.push_str(line);
        out.push_str("\r\n");
    }
    out.into_bytes()
}

fn csv_escape(value: &str) -> String {
    let value = value.replace('\r', " " ).replace('\n', " " );
    if value.contains(',') || value.contains('\"') {
        format!("\"{}\"", value.replace('"', "\"\""))
    } else {
        value
    }
}

fn safe_filename(value: &str, max_len: usize) -> String {
    let mut out = String::with_capacity(value.len().min(max_len));
    for ch in value.chars() {
        if out.chars().count() >= max_len {
            break;
        }
        match ch {
            '/' | '\\' | ':' | '*' | '?' | '"' | '<' | '>' | '|' | '\0' => out.push('_'),
            c if c.is_control() => out.push('_'),
            c => out.push(c),
        }
    }
    let trimmed = out.trim().trim_matches('.').trim().to_string();
    if trimmed.is_empty() {
        "sans_nom".to_string()
    } else {
        trimmed
    }
}

fn js_error(message: &str) -> JsValue {
    JsValue::from_str(message)
}

fn io_error(error: std::io::Error) -> JsValue {
    js_error(&format!("Erreur d’écriture : {error}"))
}

fn zip_error(error: zip::result::ZipError) -> JsValue {
    js_error(&format!("Erreur ZIP : {error}"))
}
