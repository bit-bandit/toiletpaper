import { serve } from "https://deno.land/std/http/server.ts";
import { marked } from "https://raw.githubusercontent.com/markedjs/marked/master/lib/marked.esm.js";

const logo = "<h1>🧻</h1>"

function render(
  title: string,
  content: string,
  includeBtm: boolean,
  root?: string,
) {
  let str = `
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
${logo}
</div>
<div id="main">
<article>
${content}
</article>
`;
   if (includeBtm && root) {
    str += `
<footer>
<a href="${root}">Back</a>
</footer>
`;
  } else if (includeBtm) {
    str += `
<footer>
<a href=".">Back</a>
</footer>
`;
  }
  str += `
</div>
</body>
</html>
`;
  return str;
}

const entryDir = "dir";

async function handler(req: Request): Response {
  const headers = new Headers([["Content-Type", "text/html; charset=utf-8"]]);

  const u = new URL(req.url);
  const path = u.pathname;

  let Output: string = "";

  if (path == "/") {
    Output = await Deno.readTextFile(`${entryDir}/index.md`);

    return new Response(
      render(
        "index.md".slice(0, -3),
        marked.parse(Output),
        false,
      ),
      {
        headers: headers,
        status: 200,
      },
    );
  }
  let s: FileInfo;
  console.log(`${entryDir}${path}`);
  console.log(`${entryDir}${path + ".md"}`);
  let f: FileInfo;

  try {
    s = await Deno.lstat(`${entryDir}${path}`);
  } catch {
    f = await Deno.lstat(`${entryDir}${path + ".md"}`);
  }
  try {
    if (f.isFile) {
      Output = await Deno.readTextFile(`${entryDir}${path + ".md"}`);
      return new Response(
        render(
          path,
          marked.parse(Output),
          true,
          ".",
        ),
        {
          headers: headers,
          status: 200,
        },
      );
    }
  } catch {
  }

  if (s.isDirectory) {
    for await (const ent of Deno.readDir(`${entryDir}${path}`)) {
      console.log(`${entryDir}${path}${ent.name}`);
      if (ent.name[0] === "+") {
        const txt = await Deno.readTextFile(`${entryDir}${path}/${ent.name}`);
        console.log(txt);
        Output = txt + "\n" + Output + "\n";
      } else if (ent.name[0] === "_") {
        continue;
      } else {
        Output += `[${ent.name.slice(0, -3)}](./${ent.name.slice(0, -3)}\n)`;
      }
    }

    return new Response(
      render(
        path,
        marked.parse(Output),
        true,
        "..",
      ),
      {
        headers: headers,
        status: 200,
      },
    );
  }
}

await serve(handler);
console.log("Listening on http://localhost:8000");
