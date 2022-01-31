export function head(name: string, css: string, favicon?: string): string {
  return `
<head>
<title>${name}</title>
<link rel="stylesheet" href="${css}" type="text/css" media="screen" title="default">
<meta charset="UTF-8">
</head>\n`;
}

export function header(title: string, slug: string, img?: string): string {
  if (img) {
    return `
<header>
<h1>${title}<img src="${img}";></img><span id="subheader">${slug}</span></h1>
</header>\n`;
  } else {
    return `
<header>
<h1>${title}<span id="subheader">${slug}</span></h1>
</header>\n`;
  }
}

export function sidebar(text: string): string {
  return `<nav id = "side-bar">\n<div>\n<ul>\n${text}\n</ul>\n</div>\n</nav>\n`;
}

export function article(text: string): string {
  return `<article>\n${text}</article>\n`;
}

export function footer(disclaimer: string): string {
  return `
<footer>
<br class="doNotDisplay doNotPrint" />
<div style="margin-right: auto;">${disclaimer}</div>
</footer>`;
}
