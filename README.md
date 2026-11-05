# Lorum Ricksum

Reconstruction of the original Rick and Morty placeholder-text generator, formerly at `lorumricksum.co.uk`.

## Architecture (Cloudflare Pages-ready)

This is now a **100% static website**. All word/paragraph generation happens in `script.js` in the browser. The 518 Rick dialogue excerpts are stored in `quotes.txt`, loaded once by `fetch()` and cached for the page session. **PHP is no longer called.**

The original interaction is preserved:
- Select **Words** or **Paragraphs**
- Choose a quantity (1–999)
- Toggle Pickle Rick to include HTML `<p>` tags in copied output
- Generate and copy text

## Cloudflare Pages deployment

1. In Cloudflare Dashboard, go to **Workers & Pages** → **Create** → **Pages** → connect Git.
2. Select GitHub repository `southernadd-cmyk/LorumRicksum` and branch `main`.
3. Set Framework preset **None**, build command **empty**, and build output directory **/** (repository root; Cloudflare may display it as `.`).
4. Deploy. Cloudflare provides a `*.pages.dev` URL.

This needs **no PHP runtime, server, Docker, database, or environment variables**.

## Test locally

Use a static HTTP server (do not open the file directly because `fetch('quotes.txt')` requires HTTP):

```
python -m http.server 8000
```

Then open http://localhost:8000/.

## Preservation notes

The frontend layout was reconstructed using the known original HTML / styling and is not a byte-for-byte copy. The PHP implementation `request.php` and `Dockerfile` remain **temporarily in the repository for rollback of the still-running Render instance**; Cloudflare Pages ignores them. Once Cloudflare is live and tested they can be deleted safely.

Images: original paper textures `paper3.png` and `paper4.png` have not been recovered. Pickle Rick is currently an externally hosted image.

Dialogue data is derived from the owner's uploaded RickAndMortyScripts.csv. Original backend PHP source was not recovered.
