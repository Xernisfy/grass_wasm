import { compile_scss, compile_scss_compressed } from "./lib/grass_wasm.js";

/**
 * This is a WASM build of the grass Rust crate
 * @see https://crates.io/crates/grass
 * @module
 */

/**
 * Compile SCSS using the grass Rust crate
 * @param scss input SCSS string (expected to be UTF-8)
 * @param [compressed=false] whether to use `Compressed` or `Expanded` (default) style
 * @returns output CSS
 * @throws Error on incorrect syntax or encoding
 */
export function compileScss(
  scss: string,
  compressed: boolean = false,
): string | never {
  return compressed ? compile_scss_compressed(scss) : compile_scss(scss);
}
