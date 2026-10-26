import init, { convert_nsf } from './pkg/nsf_converter.js';

const ready = init();

self.addEventListener('message', async event => {
  try {
    await ready;
    const { buffer, name, formats } = event.data;
    const input = new Uint8Array(buffer);
    const zip = convert_nsf(input, name, JSON.stringify(formats));
    self.postMessage({ ok: true, zip }, [zip.buffer]);
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error?.message || String(error)
    });
  }
});
