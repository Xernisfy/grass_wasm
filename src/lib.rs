use grass::OutputStyle::{Compressed, Expanded};
use wasm_bindgen::prelude::*;

fn compile_scss_internal(input: &str, compressed: bool) -> Result<String, JsValue> {
    let mut options = grass::Options::default();
    options = options.style(if compressed { Compressed } else { Expanded });
    match grass::from_string(input, &options) {
        Ok(css) => Ok(css),
        Err(e) => Err(JsValue::from_str(&format!("Error compiling Sass: {}", e))),
    }
}

#[wasm_bindgen]
pub fn compile_scss(input: &str) -> Result<String, JsValue> {
    compile_scss_internal(input, false)
}

#[wasm_bindgen]
pub fn compile_scss_compressed(input: &str) -> Result<String, JsValue> {
    compile_scss_internal(input, true)
}
