# `toiletpaper` - The crappy documentation generator

`toiletpaper` is a file-system based tool for creating lightweight webpages for
documentation.

## Usage/Tutorial
```
deno run --allow-net --allow-read=. toiletpaper.ts
```
Toiletpaper reads from the path provided in the URL, and tries to determine if the path directs to
either a file, or a directory. Results will change depending on the criteria met.

The default name for a directory to read from is `dir`.

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
