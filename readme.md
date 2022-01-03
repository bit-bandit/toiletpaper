# `toiletpaper` - The shitty documentation generator

`toiletpaper` is a file-system based tool for creating lightweight
documentation.

## Usage + Tutorial

First, create a folder. For this example, we'll call it `book`

```sh
mkdir book
```

In that directory, create a Markdown file, and another folder, with some
more Markdown files in it. Remember to prefix all folders/files with the number
you want them to be organized in!:

```
'1 - Hello World!'.md
'2 - Why am I a file?'.md
'3 - Closing'.md
```

Once we have that done, create a JavaScript file for setting the input, and output of the pages:

```js
// index.js

const tp = require("toiletpaper");

// Locate to directory containing Markdown files.
tp.srcDir = "./book/";
// Directory where Markdown files will be rendered.
tp.outDir = "./out/";

// Render markdown files
tp.render();
```

<!--
or, if you want to go with the CLI...

```sh
NOT YET!
toiletpaper -s book/ -o out/
```
-->

That's it. Execute the file, and you should see your pages rendered in the output file!

## API

There's two kinds of elements to the API:

- Required: Needs to be declared.
- Optional: Used if wanted.
- Function: Functions(duh).

### Required

---

#### `toiletpaper.srcDir = '...'`

Sets where directory containing raw Markdown files are. Will loop through them, turning them into pages.

#### `toiletpaper.outDir = '...'`

Where markdown files will be outputted.

### Optional

---

#### `toiletpaper.css = '...'`

CSS stylesheet. See `style.css` to get an indea of how to design your own.

#### `toiletpaper.name = '...'`

Name of site. (Defaults to 'Toilet Paper Documentation')

#### `toiletpaper.slug = '...'`

Site slug (appears next to name). (Defaults to 'The crappiest way to tell people what to do.')

#### `toiletpaper.footer = '...'`

Site footer text. (Defaults to a link to the GitHub repository)

### Function

---

#### `toiletpaper.render()`

Render pages from `srcDir` to `outDir`.

## Hacking

`toiletpaper` doesn't use any front-end JavaScript framework. It just uses raw HTML, and a basic,
bespoke templating language to do all the work for you.

The main layout template is located in `layout.js`. You can modify the HTML to your liking from there.

## License

0BSD.
