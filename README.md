# Lorum Ricksum

Restoration of the original 2021/2022 Rick & Morty themed placeholder-text generator at lorumricksum.co.uk.

The archived frontend made AJAX GET calls to `request.php?words=N&ptags=p|none` or `request.php?para=N&ptags=p|none`. This repository preserves that API.

The backend is a reconstruction, not recovered original PHP source. Dialogue data is derived from the user's supplied RickAndMortyScripts.csv.

## Run locally
`php -S localhost:8000` then open http://localhost:8000.

## Deployment
Dockerfile runs PHP's built-in server on the hosting platform's PORT.

Image limitations: Original paper3.png and paper4.png were not recovered from the archive. Pickle Rick remains an externally hosted image.
