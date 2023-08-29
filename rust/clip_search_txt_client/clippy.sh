#!/usr/bin/env bash

# 检测坏代码风格

DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -ex

if ! hash cargo-clippy 2>/dev/null; then
  rustup component add clippy
fi

git add -u && git commit -m'.' || true
cargo fmt
cargo +nightly clippy --fix -Z unstable-options -- \
  -A clippy::uninit_assumed_init
cargo fmt
