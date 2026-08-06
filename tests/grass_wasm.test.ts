import { assertEquals } from "@std/assert/equals";
import { assertInstanceOf } from "@std/assert/instance-of";
import { assertThrows } from "@std/assert/throws";
import { compileSass, compileScss } from "../mod.ts";

const sass = `
$primary-color: #3498db

body
  background-color: $primary-color

  .container
    padding: 20px
    color: darken($primary-color, 20%)
`;
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
const invalid = "? invalid syntax ?";

// Sass compilation
Deno.test("should compile sass to expanded format", () => {
  assertEquals(
    compileSass(sass),
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

Deno.test("should compile sass to compressed format", () => {
  assertEquals(
    compileSass(sass, "compress"),
    "body{background-color:#3498db}body .container{padding:20px;color:#196090}",
  );
});

Deno.test("should throw error on bad sass syntax", () => {
  const err = assertThrows(() => compileSass(invalid));
  assertInstanceOf(err, SyntaxError);
});

Deno.test("should throw error on scss syntax", () => {
  const err = assertThrows(() => compileSass(scss));
  assertInstanceOf(err, SyntaxError);
});

// Scss compilation
Deno.test("should compile scss to expanded format", () => {
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

Deno.test("should compile scss to compressed format", () => {
  assertEquals(
    compileScss(scss, "compress"),
    "body{background-color:#3498db}body .container{padding:20px;color:#196090}",
  );
});

Deno.test("should throw error on bad scss syntax", () => {
  assertThrows(() => compileScss("bad scss"));
});

// Sass/Scss (inferred) compilation
