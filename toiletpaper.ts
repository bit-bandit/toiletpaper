import { article, footer, head, header, sidebar } from "./layouts.ts";
import { marked } from "https://raw.githubusercontent.com/markedjs/marked/master/lib/marked.esm.js";

// Interface shite.
interface TP {
  srcDir: string | undefined;
  outDir: string | undefined;

  name: string;
  slug: string;
  footer: string;
  css: string;

  render: any; // This is probably bad, but whatever.
}

export const toiletpaper: TP = {
  srcDir: undefined,
  outDir: undefined,

  name: "🧻 Toilet Paper Documentation",
  slug: "The crappiest way to tell people what to do.",
  footer:
    '<a href="https://github.com/bit-bandit/toiletpaper">https://github.com/bit-bandit/toiletpaper</a>',
  css: `${Deno.cwd()}/style.css`,

  render: async function () {
    let regexreplace = /.md$/gmi; // For removing junk in filenames. Edit this to your liking.

    let listing: string = "";

    for await (let page of Deno.readDir(`${toiletpaper.srcDir}`)) {
      let title: string = `${page.name.replace(regexreplace, "")}`;
      let exDup = new RegExp(title + "[^/]");

      if (page.isFile && (!exDup.test(listing))) {
        listing += `<li><a href="${Deno.cwd()}/${toiletpaper.outDir}${
          encodeURIComponent(title)
        }.html">&rsaquo; ${title}</a></li>\n`;
      } else if (page.isDirectory) {
        // Enable below if you just want directories to be indicators..
        listing +=
          `<li><a href="${Deno.cwd()}/${toiletpaper.outDir}${title}.html">&rsaquo; ${title}</a></li>\n`; //
        listing += `<li>\n<ul>\n`;
        for await (
          let entry of Deno.readDir(`${toiletpaper.srcDir}/${page.name}`)
        ) {
          if (entry.isFile) {
            listing += `<li><a href="${Deno.cwd()}/${toiletpaper.outDir}${
              encodeURIComponent(title)
            }/${entry.name.replace(regexreplace, "")}.html">&rsaquo; ${
              entry.name.replace(regexreplace, "")
            }</a></li>\n`;
          }
        }
        listing += `</ul>\n</li>\n`;
      }
    }
    // console.log(sidebar(listing));
    // Render files
    for await (let page of Deno.readDir(`${toiletpaper.srcDir}`)) {
      let title: string = `${page.name.replace(regexreplace, "")}`;
      if (page.isFile) {
        let file: string = await Deno.readTextFile(
          `${toiletpaper.srcDir}${page.name}`,
        );
        let parsed: string = await marked.parse(file);

        let output: string = (
          "<!DOCTYPE HTML>\n<html>\n" +
          head(`${title} - ${toiletpaper.name}`, toiletpaper.css) +
          "<body>" +
          header(toiletpaper.name, toiletpaper.slug) +
          sidebar(listing) +
          article(parsed) +
          footer(toiletpaper.footer) +
          "\n</body>\n</html>"
        );

        await Deno.writeTextFile(`${toiletpaper.outDir}${title}.html`, output);
        console.log(`Page Rendered: ${title}`);
      } else if (page.isDirectory) {
          try {
	      await Deno.mkdir(`${toiletpaper.outDir}${title}`);
	  } catch (err) {
	      continue;
	  }
        for await (
          let entry of Deno.readDir(`${toiletpaper.srcDir}/${page.name}`)
        ) {
          if (entry.isFile) {
            let title: string = `${entry.name.replace(regexreplace, "")}`;
            let file: string = await Deno.readTextFile(
              `${toiletpaper.srcDir}${page.name}/${entry.name}`,
            );
            let parsed: string = await marked.parse(file);

            let output: string = (
              "<!DOCTYPE HTML>\n<html>\n" +
              head(`${title} - ${toiletpaper.name}`, toiletpaper.css) +
              "<body>" +
              header(toiletpaper.name, toiletpaper.slug) +
              sidebar(listing) +
              article(parsed) +
              footer(toiletpaper.footer) +
              "\n</body>\n</html>"
            );
            await Deno.writeTextFile(
              `${toiletpaper.outDir}${page.name}/${title}.html`,
              output,
            );
            console.log(`Page Rendered: ${title}`);
          }
        }
      }
    }
  },
};
