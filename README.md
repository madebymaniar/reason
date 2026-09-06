# REASON ✦

**Your devices remember what you did. They forget why.**

REASON is a concept about **memory, context and intention** — exploring what digital memory could become if our devices preserved not only what we saved, but why it mattered.

## Live site

After enabling GitHub Pages for the `main` branch and `/ (root)` folder:

**https://madebymaniar.github.io/reason/**

### Interactive preview

**https://madebymaniar.github.io/reason/preview.html**

## Project structure

```text
reason/
├── index.html
├── preview.html
├── styles.css
├── app.js
├── README.md
├── .nojekyll
├── 404.html
├── robots.txt
└── assets/
    ├── favicon.svg
    ├── social-preview.png
    ├── reason-cover.png
    ├── observation-board.png
    ├── how-it-works.png
    └── palette.webp
```

## Core idea

```text
Action
↓
Context
↓
Intention
↓
Memory
```

```js
function remember(item) {
  const context = detectContext(item)
  const intent = suggestIntent(context)

  return save({
    item,
    context,
    intent
  })
}
```

---

### CASE NOTE 001

**Made by Maniar ✦**

> Notice differently. Question better. Make it tangible.
