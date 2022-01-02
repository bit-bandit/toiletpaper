import fs from "fs";
import { marked } from "marked"; // This is out of place, but Marked needs it to work.
import { fileURLToPath } from "url";
import path from "path";

let srcDir = "test/";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

      function filelist() {
        fs.readdirSync(srcDir).forEach((doc) => {
          console.log(`<li><a href="./${path.parse(doc).name}.html">${path.parse(doc).name}</a></li>\n`)
        });
      }


console.log(filelist())
