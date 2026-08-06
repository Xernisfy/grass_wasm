/**
 * This is a WebAssembly wrapper for the grass Rust crate
 * @see https://crates.io/crates/grass
 *
 * @example
 * ```ts
 * import { compileScss } from "@xernisfy/grass_wasm";
 * compileScss(`
 *   $primary-color: #3498db;
 *
 *   body {
 *     background-color: $primary-color;
 *   }
 * `);
 * ```
 *
 * @module
 */

import { grass_compile } from "./lib/grass_wasm.js";

type Syntax = "sass" | "scss" | "css" | "infer";
type Style = "expand" | "compress";

function wrapGrassCompile(
  input: string,
  syntax: Syntax,
  style: Style,
): string | never {
  try {
    return grass_compile(input, syntax, style);
  } catch (err) {
    if (typeof err === "string") {
      if (err === "RuntimeError: unreachable") {
        throw new SyntaxError("unknown syntax error");
      }
      throw new SyntaxError(err);
    }
    throw new Error("unknown occurred during compilation");
  }
}

/**
 * Compile Sass using the grass Rust crate
 * @param input Sass string
 * @param style whether to use `Compressed` or `Expanded` (default)
 * @returns Css string
 * @throws Error on incorrect syntax or encoding
 */
export function compileSass(
  input: string,
  style: Style = "expand",
): string | never {
  return wrapGrassCompile(input, "sass", style);
}

/**
 * Compile Scss using the grass Rust crate
 * @param input Scss string
 * @param style whether to use `Compressed` or `Expanded` (default)
 * @returns Css string
 * @throws Error on incorrect syntax or encoding
 */
export function compileScss(
  input: string,
  style: Style = "expand",
): string | never {
  return wrapGrassCompile(input, "scss", style);
}

/**
 * Compile Sass/Scss (inferred) using the grass Rust crate
 * @param input Sass/Scss string
 * @param style whether to use `Compressed` or `Expanded` (default)
 * @returns Css string
 * @throws Error on incorrect syntax or encoding
 */
export function compile(
  input: string,
  style: Style = "expand",
): string | never {
  return wrapGrassCompile(input, "infer", style);
}
