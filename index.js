// SPDX: 0BSD
// ...
// TODO:
//   [ ] - Add proper subdirectory support (Modifications in either loop 1 or 2.)

import fs from "fs";
import { marked } from "marked"; // This is out of place, but Marked needs it to work.
import { fileURLToPath } from "url";
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
    //
    //   fs.open r - for markdown files
    //   fs w - for rendered HTML
    //      fs.opendir()
    // Have to impliment this natively because ESM is a shit.
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Loop 1: List all the files, for the left-side navbar.
    // Get all the files in the directory as an array and loop over them to get the result?
    // Save said result as a variable?
      // I don't fucking know.
    var list = [];
     
    function fullList() {

      fs.readdir(toiletpaper.srcDir, (err, docs) => {
        docs.forEach((doc) => {
          // TODO: Modify strings prior to turning them into arrays.
	  //       By that, I mean remove the `.md` extension.  
          // list.push(doc);
	  list.push(doc); 
        });
      });
    }
      
    let navigation = `<li><a href="/fullList">&rsaquo; fullList</a></li>`;
     
     for (let i = 0; i < list.length; i++) {
       navigation.concat(' \n ', `<li><a href="/${list[i]}">&rsaquo; ${list[i]}</a></li>`);
     }


    // Loop 2: Render each file.
      fs.readdir(this.srcDir, (err, docs) => {
      docs.forEach((doc) => {
	doc.replace(/\s+/g, '')    
        let src = fs.readFileSync(`${__dirname}/${this.srcDir}${doc}`, "utf8");
        let out = `${__dirname}/${this.outDir}${doc}`;
	let abriv_out = `${__dirname}/${this.outDir}${path.parse(doc).name}`

        let markdown_render = marked.parse(src);  

	function genhtml (tag, innerhtml) {
          return `<${tag}>${innerhtml}</${tag}>`
        }

	function alltxt() {
	    // This is awful, and unexcusable code, but
	    // it's the most basic way to ensure proper
	    // output 100% of the time.
	    return `${head(toiletpaper.css, toiletpaper.name)}
	            ${header(toiletpaper.name, toiletpaper.slug)}
	            ${nav(navigation)}
                    ${genhtml("article", markdown_render)}
                    ${footer(toiletpaper.footer)}`
	 }

        console.log(`${genhtml("article", markdown_render)}`);
	  
          fs.writeFile(`${abriv_out}.html`,
		       `${head(toiletpaper.css, toiletpaper.name)}
                        ${header(toiletpaper.name, toiletpaper.slug)}
                        ${nav(navigation)}
                        ${genhtml("article", markdown_render)}
                        ${footer(toiletpaper.footer)}`,
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
