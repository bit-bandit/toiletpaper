// SPDX: 0BSD
// TODO:
//   [ ] - Add proper subdirectory support (Modifications in either loop 1 or 2.)
//         If file is in directory with seperate number, prepend number (ie. 2.1)
//
//   [ ] - Add condition for the `.thisPage` css class, for the sidebar.

import fs from "fs";
import { marked } from "marked"; // This is out of place, but Marked needs it to work.
import { fileURLToPath } from "url"; // This is just to handle a single component. At least it's just one function...
import path from "path";

import { head, header, nav, footer } from "./layout.js";

export default const toiletpaper = {
  // Directory variables (these values left intentionally blank)
  srcDir: null,
  outDir: null,

  // Predefined Variables
  name: " 🧻 Toilet Paper Documentation",
  slug: "The crappiest way to tell people what to do.",
  footer:
    '<a href="https://github.com/bit-bandit/toiletpaper">https://github.com/bit-bandit/toiletpaper</a>',
  css: "../style.css",

  // render files
  render: function () {
    console.log("Rendering pages...");

    // Have to impliment this natively because ESM is a shit.
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    let page_nav = [];

    fs.readdir(this.srcDir, (err, docs) => {
      docs.forEach((doc) => {
        page_nav.push(
          `<li><a href="./${path.parse(doc).name}.html">&rsaquo; ${
            path.parse(doc).name
          }</a></li>`
        );
      });
    });

    // Loop 2: Render each file.
    fs.readdir(this.srcDir, (err, docs) => {
      docs.forEach((doc) => {
        // doc.replace(/\s+/g, '')
        let src = fs.readFileSync(`${__dirname}/${this.srcDir}${doc}`, "utf8");
        let out = `${__dirname}/${this.outDir}${doc}`;
        let abriv_out = `${__dirname}/${this.outDir}${path.parse(doc).name}`;

        let markdown_render = marked.parse(src);

        function genhtml(tag, innerhtml) {
          return `<${tag}>${innerhtml}</${tag}>`;
        }

          fs.writeFile(
            `${abriv_out}.html`,
            `<!DOCTYPE HTML>
		        <html>
		        ${head(toiletpaper.css, toiletpaper.name)}
                        ${header(toiletpaper.name, toiletpaper.slug)}
                        ${nav(page_nav.join("\n"))}
                        ${genhtml("article", markdown_render)}
                        ${footer(toiletpaper.footer)}
                        </html>`,
          (err) => {
            if (!err) {
              console.log(`${out}: Rendered`);
            } else if (err) {
              console.log(err);
            }
	  }
        );
      });
    });
  }
};
