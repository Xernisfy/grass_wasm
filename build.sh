set -Eeuxo pipefail

rustup update
cargo update
deno upgrade
deno update
deno task wasmbuild
deno test
