#!/usr/bin/env bash
set -euo pipefail

command -v wasm-pack >/dev/null || {
  echo "wasm-pack est requis : https://rustwasm.github.io/wasm-pack/installer/" >&2
  exit 1
}

rustup target add wasm32-unknown-unknown >/dev/null 2>&1 || true
wasm-pack build --release --target web --out-dir web/pkg --out-name nsf_converter

echo "Build terminé dans web/. Lance un serveur HTTP statique sur ce dossier."
