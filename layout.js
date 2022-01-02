// SPDX: 0BSD

// Before you go any further; This is some ugly HTML/JS.

export function head(css, name) {
return`
<head>
<title>${name}</title>
<link rel="stylesheet" href="${css}" type="text/css" media="screen" title="default">
<meta charset="UTF-8">
</head>`;
}

export function header(title, slug) {
return`
<header>
<h1>${title}<span id="subheader">${slug}</span></h1>
</header>`;
}

export function nav(files) {
return`
<nav id = "side-bar">
<div>
<ul>
${files}
</ul>
</div>
</nav>`;
}

export function footer(disclaimer) {
return`
<footer>
<br class="doNotDisplay doNotPrint" />
<div style="margin-right: auto;">${disclaimer}</p></div>
</footer>`;
}
