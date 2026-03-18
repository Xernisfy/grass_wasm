import { assertEquals } from "@std/assert";
import { compileScss } from "../mod.ts";

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
    compileScss(scss),
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
    compileScss(scss, true),
    "body{background-color:#3498db}body .container{padding:20px;color:#196090}",
  );
});
