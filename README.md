# The Kata Scroll

**Live:** https://nikhil21111.github.io/kata-scroll/

An interactive, story-driven book built from the public transcripts of Varun Mayya's 16-Kata YouTube masterclass series — fourteen katas re-sequenced as one journey: from the first swing a young operator never takes, through the craft, the company, and the climb, to the way the wealthy actually think.

## What it is

- **14 chapters + cover**, each a single self-contained HTML file — no build step, no dependencies, no tracking. Open any file anywhere.
- **Every chapter was written from a complete read of its source transcript** — no skimming. Every named story, framework, and number from the session is preserved and expanded: story first, the meaning beneath it, then how to practice it.
- **The design** is Japanese inkwash (sumi-e): paper, ink, a vermilion seal. Chapters carry hand-coded SVG diagrams, flip cards that enact the teaching, ink-marking (double-tap any paragraph), and practice checklists. The book remembers your place, your marks, and your practice lists on your own device (localStorage) — nothing leaves the browser.
- **It reads offline.** Install it from the browser (Add to Home Screen / install prompt) and the whole book is cached by a service worker.
- **The form** is the emaki (絵巻), the Japanese narrative picture scroll — unrolled as it's read, story and teaching moving together on paper.

## Credits & source

Built from the public transcripts of [Varun Mayya's Katas playlist](https://www.youtube.com/playlist?list=PLSAVyiM48sqvzLBEbPqD8TZpfu5UyzO9t). Every chapter links back to the exact source video and credits it in full. **The Kata Scroll is an independent study companion — not affiliated with Varun Mayya or Aeos.** All rights to the source material remain with its creator; this project exists to send readers back to the original.

## Repo layout

```
index.html              the cover — start here
ch01…ch14*.html         the fourteen chapters
manifest.webmanifest    install metadata (PWA)
sw.js                   the offline shelf (service worker)
icon-192/512.png        the enso icon
```

To update the book: edit files, then `git push` — GitHub Pages redeploys automatically.
