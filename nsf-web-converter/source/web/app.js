const fileInput = document.querySelector('#fileInput');
const dropzone = document.querySelector('#dropzone');
const selectedFileBox = document.querySelector('#selectedFile');
const fileName = document.querySelector('#fileName');
const fileSize = document.querySelector('#fileSize');
const clearFile = document.querySelector('#clearFile');
const convertButton = document.querySelector('#convertButton');
const status = document.querySelector('#status');

let selectedFile = null;
let worker = null;

function ensureWorker() {
  if (!worker) {
    worker = new Worker('./worker.js', { type: 'module' });
  }
  return worker;
}

function prettyBytes(bytes) {
  const units = ['o', 'Ko', 'Mo', 'Go'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toLocaleString('fr-FR', { maximumFractionDigits: unit ? 1 : 0 })} ${units[unit]}`;
}

function setFile(file) {
  selectedFile = file || null;
  status.textContent = '';
  status.className = 'status';

  if (!selectedFile) {
    dropzone.hidden = false;
    selectedFileBox.hidden = true;
    convertButton.disabled = true;
    fileInput.value = '';
    return;
  }

  fileName.textContent = selectedFile.name;
  fileSize.textContent = prettyBytes(selectedFile.size);
  dropzone.hidden = true;
  selectedFileBox.hidden = false;
  convertButton.disabled = false;

  if (selectedFile.size > 300 * 1024 * 1024) {
    status.textContent = 'Fichier volumineux : la conversion peut consommer beaucoup de mémoire dans le navigateur.';
  }
}

function formats() {
  return Object.fromEntries(
    [...document.querySelectorAll('[data-format]')].map(input => [input.dataset.format, input.checked])
  );
}

function downloadBlob(bytes, sourceName) {
  const stem = sourceName.replace(/\.[^.]+$/, '') || 'nsf';
  const blob = new Blob([bytes], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${stem}-export.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

fileInput.addEventListener('change', () => setFile(fileInput.files?.[0]));
clearFile.addEventListener('click', () => setFile(null));

for (const eventName of ['dragenter', 'dragover']) {
  dropzone.addEventListener(eventName, event => {
    event.preventDefault();
    dropzone.classList.add('dragover');
  });
}
for (const eventName of ['dragleave', 'drop']) {
  dropzone.addEventListener(eventName, event => {
    event.preventDefault();
    dropzone.classList.remove('dragover');
  });
}
dropzone.addEventListener('drop', event => {
  const file = event.dataTransfer?.files?.[0];
  if (file) setFile(file);
});

convertButton.addEventListener('click', async () => {
  if (!selectedFile) return;
  const chosen = formats();
  if (!Object.values(chosen).some(Boolean)) {
    status.textContent = 'Sélectionne au moins un format.';
    status.className = 'status error';
    return;
  }

  convertButton.disabled = true;
  convertButton.classList.add('loading');
  status.textContent = 'Lecture du fichier…';
  status.className = 'status';

  try {
    const buffer = await selectedFile.arrayBuffer();
    status.textContent = 'Conversion locale en cours…';

    const currentWorker = ensureWorker();
    const result = await new Promise((resolve, reject) => {
      const onMessage = event => {
        currentWorker.removeEventListener('message', onMessage);
        currentWorker.removeEventListener('error', onError);
        if (event.data?.ok) resolve(event.data.zip);
        else reject(new Error(event.data?.error || 'Erreur inconnue dans le convertisseur.'));
      };
      const onError = event => {
        currentWorker.removeEventListener('message', onMessage);
        currentWorker.removeEventListener('error', onError);
        reject(new Error(event.message || 'Le module WebAssembly a échoué.'));
      };
      currentWorker.addEventListener('message', onMessage);
      currentWorker.addEventListener('error', onError);
      currentWorker.postMessage({
        buffer,
        name: selectedFile.name,
        formats: chosen
      }, [buffer]);
    });

    downloadBlob(result, selectedFile.name);
    status.textContent = 'Conversion terminée. Le ZIP a été généré localement.';
    status.className = 'status success';
  } catch (error) {
    console.error(error);
    status.textContent = error?.message || String(error);
    status.className = 'status error';
  } finally {
    if (worker) {
      worker.terminate();
      worker = null;
    }
    convertButton.disabled = false;
    convertButton.classList.remove('loading');
  }
});
