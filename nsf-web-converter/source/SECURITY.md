# Security model

This project is a static client-side application. A normal deployment has no application server and therefore no endpoint that receives NSF files.

## Threat model

- NSF data is potentially highly sensitive. Keep the application free from third-party analytics, remote fonts and ad scripts.
- A malicious NSF is untrusted input. The upstream parser is read-only and forbids unsafe Rust, but parsing bugs may still exist.
- Browser memory is finite. Large archives can exhaust the tab or WebAssembly memory.
- Generated filenames are sanitized before being inserted into the ZIP.
- EML header values have CR/LF removed to reduce header-injection risks.

For maximum assurance, self-host the static build and pin dependency versions in `Cargo.lock` after the first successful build.
