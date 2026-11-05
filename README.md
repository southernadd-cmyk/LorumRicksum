# Lorum Ricksum

**Lorem Ipsum + Rum + Rick Quotes = Lorum Ricksum**

A Rick and Morty-themed placeholder-text generator, originally published at `lorumricksum.co.uk` in 2021–22. It uses dialogue attributed to Rick Sanchez to produce random words or paragraphs for use as placeholder text.

**Live site:** https://southernadd-cmyk.github.io/LorumRicksum/

## How to use it

1. Select **Words** or **Paragraphs**.
2. Enter the number you want to generate (up to 999).
3. Click **Generate Text**.
4. Click **Pickle Rick** to toggle literal `<p>` and `</p>` tags around each generated paragraph. This also updates text already on screen.
5. Use the **Copy** button to copy the displayed output, including tags when they are enabled.

The number selector counts words in **Words** mode and paragraphs in **Paragraphs** mode.

## How it works

The current edition is a **static HTML, CSS and JavaScript site**. The browser loads `quotes.txt` and generates the text locally with `script.js`; it does not require PHP, a server-side API, a database or a build step.

- `index.html` — page structure and controls
- `style.css` — layout and visual styling
- `script.js` — text generation, tag toggle and copying
- `quotes.txt` — 518 Rick-related dialogue lines extracted from the owner's supplied `RickAndMortyScripts.csv`
- `.github/workflows/pages.yml` — automatic GitHub Pages deployment from `main`

## Run locally

Serve the repository directory over HTTP (opening `index.html` directly as a `file://` URL can prevent the browser from loading `quotes.txt`):

```bash
python -m http.server 8000
```

Then open http://localhost:8000/.

## Hosting

This project is **deployed to GitHub Pages**, not Cloudflare Pages. Updates pushed to `main` are automatically published by the GitHub Actions workflow.

The repository still contains `request.php` and a `Dockerfile` from an earlier, server-hosted reconstruction. **Neither is used by the GitHub Pages version.** The currently functioning generator is entirely browser-based.

## Restoration notes

This is a **reconstruction**, not a recovered copy of every original file. The page has been restyled using a screenshot of the old website as a reference, while retaining the original layout concept: wide header, controls on the left, and a tilted paper-like output area on the right.

The original PHP source and original paper texture files (`paper3.png` and `paper4.png`) were not recovered. The Pickle Rick image is loaded from an external image URL, so its availability depends on that host.

The current text corpus comes from the CSV supplied for this restoration, not from a recovered copy of the original site's backend data.
