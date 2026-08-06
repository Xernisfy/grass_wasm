use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grass_compile(input: &str, syntax: &str, style: &str) -> Result<String, JsValue> {
    let mut options = grass::Options::default();
    match syntax {
        "css" => options = options.input_syntax(grass::InputSyntax::Css),
        "sass" => options = options.input_syntax(grass::InputSyntax::Sass),
        "scss" => options = options.input_syntax(grass::InputSyntax::Scss),
        _ => (),
    }
    match style {
        "compress" => options = options.style(grass::OutputStyle::Compressed),
        "expand" => options = options.style(grass::OutputStyle::Expanded),
        _ => (),
    }
    match grass::from_string(input, &options) {
        Ok(css) => Ok(css),
        Err(e) => Err(JsValue::from_str(&e.to_string())),
    }
}
