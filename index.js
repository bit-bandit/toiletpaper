// SPDX: 0BSD
// ...
// TODO:
//   [ ] - Add proper subdirectory support (Modifications in either loop 1 or 2.)
//         If file is in directory with seperate number, prepend number (ie. 2.1)

import fs from "fs";
import { marked } from "marked"; // This is out of place, but Marked needs it to work.
import { fileURLToPath } from "url"; // This is just to handle a single component. At least it's just one function...
import path from "path";

import { head, header, nav, footer } from "./layout.js";

const toiletpaper = {
  // Directory variables (these variables left intentionally blank)
  srcDir: "test/",
  outDir: "out/",

  // Predefined Variables
  name: "Toilet Paper Documentation",
  slug: "The crappiest way to tell people what to do.",
  footer: '<a href="https://github.com/bit-bandit/toiletpaper">https://github.com/bit-bandit/toiletpaper</a>',
  css: "../style.css",

  render: function () {
      console.log("Rendering pages...")
    // Sorting algorithm: 1-9, A-Z
    // If file is in directory with seperate number, append number like so:
    // 'directorynumber.filenumber'

    // Have to impliment this natively because ESM is a shit.
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    let nav_list = "<!--Navigation-->";
 
    // Loop 1: List all the files, for the left-side navbar.
      let filelist = function () {
        fs.readdirSync(toiletpaper.srcDir).forEach((doc) => {
            return('\n', `<li><a href="./${path.parse(doc).name}.html">${path.parse(doc).name}</a></li>`);
        });
      };
      
    // Loop 2: Render each file.
      fs.readdir(this.srcDir, (err, docs) => {
      docs.forEach((doc) => {
	// doc.replace(/\s+/g, '')    
        let src = fs.readFileSync(`${__dirname}/${this.srcDir}${doc}`, "utf8");
        let out = `${__dirname}/${this.outDir}${doc}`;
	let abriv_out = `${__dirname}/${this.outDir}${path.parse(doc).name}`

        let markdown_render = marked.parse(src);  

	function genhtml (tag, innerhtml) {
          return `<${tag}>${innerhtml}</${tag}>`
        }

        // console.log(`${genhtml("article", markdown_render)}`);
	  
          fs.writeFile(`${abriv_out}.html`,
		       `<!DOCTYPE HTML>
		        <html>
		        ${head(toiletpaper.css, toiletpaper.name)}
                        ${header(toiletpaper.name, toiletpaper.slug)}
                        <!--Put Nav here, when stable enough.-->
                        ${genhtml("article", markdown_render)}
                        ${footer(toiletpaper.footer)}
                        </html>`,
	  err => {
              if (!err) {
		  console.log(`${out}: Rendered`);
	      }
	      else if (err) {
		  console.log(err);
	      };
	  });
      });
    });
  }
}
    //       else if item = directory:
    //          iterate same process as above
    //          for each file.

toiletpaper.render();
