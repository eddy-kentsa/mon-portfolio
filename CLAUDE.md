# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MonPortfolio — static personal portfolio website built with HTML, CSS, and vanilla JavaScript. No frameworks or build tools.

## Stack

- HTML5, CSS3, vanilla JavaScript (ES6+)
- No frameworks, no bundlers, no package manager
- Static site — files are served as-is

## Design Guidelines

- Minimalist, professional aesthetic
- Dark background theme
- Mobile-first responsive design (start with mobile styles, use `min-width` media queries for larger screens)

## Code Conventions

- **Code language:** All variable names, function names, CSS classes, IDs, file names, and comments must be in English
- **Visible content:** All user-facing text (headings, paragraphs, labels, alt text) must be in French
- Keep CSS in external stylesheets, JS in external scripts — no inline styles or scripts
- Use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<footer>`, etc.)

## File Structure

```
index.html          — main entry point
css/style.css       — global styles
js/main.js          — main JavaScript
assets/images/      — image assets
```

## Development

Open `index.html` directly in a browser or use any static file server:

```
python3 -m http.server 8000
```
