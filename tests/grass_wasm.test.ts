import { assertEquals } from "@std/assert";
import { compile_scss, compile_scss_compressed } from "grass_wasm";

const scss = `
  $primary-color: #3498db;

  body {
    background-color: $primary-color;

    .container {
      padding: 20px;
      color: darken($primary-color, 20%);
    }
  }
`;

Deno.test("should compile to expanded format", () => {
  assertEquals(
    compile_scss(scss),
    `body {
  background-color: #3498db;
}
body .container {
  padding: 20px;
  color: #196090;
}
`,
  );
});

Deno.test("should compile to compressed format", () => {
  assertEquals(
    compile_scss_compressed(scss),
    "body{background-color:#3498db}body .container{padding:20px;color:#196090}",
  );
});
