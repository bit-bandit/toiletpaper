# 🧻 `toiletpaper` - The crappy documentation generator

`toiletpaper` is a file-system based tool for creating lightweight webpages for
documentation.

## Usage/Tutorial

First, create a folder. For this example, we'll call it `book`

```sh
mkdir book
```

In that directory, create a Markdown file, and another folder, with some
more Markdown files in it. Remember to prefix all files with the number
you want them to be organized in!:

```
'1 - Hello World!'.md
'2 - Why am I a file?'.md
'3 - Closing'.md
```

After that, create a directory to store the output, of the generated HTML pages.

Once we have that done, create a JavaScript file for setting the input, and output of the pages, alongside the render function:

```js
// index.js

import { toiletpaper } from 'toiletpaper';

// Locate to directory containing Markdown files.
toiletpaper.srcDir = "book/";

// Directory where Markdown files will be rendered.
toiletpaper.outDir = "out/";

// Render markdown files
toiletpaper.render();
```

That's it. Execute the file, and you should have your pages rendered in the output file!

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

Where rendered pages will be outputted.


### Optional

---

#### `toiletpaper.css = '...'`

CSS stylesheet. See `style.css` to get an indea of how to design your own.

#### `toiletpaper.name = '...'`

Name of site. (Defaults to '🧻 Toilet Paper Documentation')

#### `toiletpaper.slug = '...'`

Site slogan (appears next to title). (Defaults to 'The crappiest way to tell people what to do.')

#### `toiletpaper.footer = '...'`

Site footer text. (Defaults to a link to the GitHub repository)


### Functions

---

#### `toiletpaper.render()`

Render pages from `srcDir` to `outDir`.

## Hacking

`toiletpaper` doesn't use any front-end JavaScript framework. It just uses HTML, and template literals 
to do all the work for you.

The main layout templates are located in `layout.ts`. You can modify the HTML to your liking from there.

## License, & Aknowledgements

`toiletpaper` is licensed under the hyper-permissive 0BSD license. You're free to do with this software,
and source code whatever you want, however you want. 

`toiletpaper` takes heavy inspiration from an older [`rc`](http://doc.cat-v.org/plan_9/4th_edition/papers/rc) based site generator called `werc`, and 
actually uses a modified version of its default stylesheet out of the box. `werc`'s license is, 
to quote directly from its README:

> Public domain, because so called ‘intellectual property’ is an oxymoron.

Couldn't have put it better ourselves. We'd like to thank the late Uriel for writing `werc`, and,
consequently, inspiring `toiletpaper`.
