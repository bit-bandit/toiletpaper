import { marked } from "https://raw.githubusercontent.com/markedjs/marked/master/lib/marked.esm.js";

function render(title: string, content: string) {
  return `
<html>
<head>
<title>${title}</title>
</head>
<style>
a { color: #000; }

body {
  display: flex; 
  justify-content: flex-start; 
  gap: 3em;
  /* Colors */
  background: #f0f0f0;  
}

article { max-width: 30em; }

footer {
  border-top: 1px solid #ccc;
  padding-top: 1em;
  padding-right: 16em;
  display: block;
}

article img {
  max-width: 60em;
  display: block;
  padding-bottom: 1em;
  padding-top: 1em;
}
</style>

<body>
<div id="logo">
<h1>:^)</h1>
</div>
<div id="main">
<article>
${content}
</article>
<footer>
<a href="..">Back</a>
</footer>
</div>
</body>
</html>
`;
}

interface Settings {
    input: string,
    base?: string,
    output?: string,
}

export async function toiletpaper(s: Settings) {
  let p: string = "";

  for await (const d_entry of Deno.readDir(s.input)) {
    if (d_entry.isFile) {
      p += `[${d_entry.name.slice(0, -3)}](./${
        d_entry.name.slice(0, -3)
      }.html)\n\n`;

      let raw = await Deno.readTextFile(`${s.input}${d_entry.name}`); // Why.
      if (s.base) {
        try {
          await Deno.lstat(`${s.output}${s.base}/`);
        } catch (err) {
          await Deno.mkdir(`${s.output}${s.base}/`);
        }
        await Deno.writeTextFile(
          `${s.output}${s.base}/${d_entry.name.slice(0, -3)}.html`,
          render(d_entry.name.slice(0, -3), marked.parse(raw)),
        );
      } else {
        await Deno.writeTextFile(
          `${s.output}${d_entry.name.slice(0, -3)}.html`,
          render(d_entry.name.slice(0, -3), marked.parse(raw)),
        );
      }
    } else {
      let qr: string = "";
      for await (const dirno2 of Deno.readDir(`${s.input}${d_entry.name}/`)) {
        if (dirno2.isFile) {
          qr += `[${dirno2.name.slice(0, -3)}](./${d_entry.name}/${
            dirno2.name.slice(0, -3)
          }.html)\n\n`;
        } else {
          qr += `[${dirno2.name.slice(0, -3)}/](./${d_entry.name}/${
            dirno2.name.slice(0, -3)
          }.html)\n\n`;
        }
      }
      await Deno.writeTextFile(
        `${s.output}${d_entry.name}.html`,
        render(d_entry.name, marked.parse(qr)),
      );
      p += `[${d_entry.name}/](./${d_entry.name}.html)\n\n`;
	await toiletpaper({input:`${s.input}${d_entry.name}/`, base: d_entry.name});
    }
  }
  await Deno.writeTextFile(
    `${s.output}index.html`,
    render("Index", marked.parse(p)),
  );
}
