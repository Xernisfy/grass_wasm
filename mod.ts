import { compile_scss, compile_scss_compressed } from "./lib/grass_wasm.js";

export function compileScss(scss: string, compressed: boolean = false): string {
  return compressed ? compile_scss_compressed(scss) : compile_scss(scss);
}
