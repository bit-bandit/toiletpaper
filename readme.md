# `toiletpaper` - The crappy documentation generator

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

After that, run a `wget` to get `toiletpaper.ts` into the directory.

Once we have that done, add the following to the bottom of the file:

```js
await toiletpaper({
  input: './book/'  // Remember to keep the / at the end!
  output: './out/'
})
```

That's it. Execute the file, and you should have your pages rendered in the output file.

## Hacking

`toiletpaper` doesn't use any front-end JavaScript framework. It just uses raw HTML/template literals 
to do all the work for you. Edit the `render` function to modify the templates to your liking.

## License, & Aknowledgements

`toiletpaper` is licensed under the hyper-permissive 0BSD license. You're free to do with this software,
and source code whatever you want, however you want. 

`toiletpaper`, especially in its original form, takes heavy inspiration from an older 
[`rc`](http://doc.cat-v.org/plan_9/4th_edition/papers/rc) based site generator called `werc`.
`werc`'s license is, to quote directly from its README:

> Public domain, because so called ‘intellectual property’ is an oxymoron.

Couldn't have put it better ourselves. We'd like to thank the late Uriel for writing `werc`, and,
consequently, inspiring `toiletpaper`.
