# Mahesh Ramani — Mathematics Research

A static React/Vite research portfolio. The project is intentionally simple: no backend, API keys, or database.

## What is included

- Home, Papers, Explanations, and About pages
- Seven attached research manuscripts stored locally under `public/papers/`
- Real first-page previews generated from those PDFs under `public/previews/`
- An in-site PDF reader using the browser's native PDF viewer
- Paper metadata/abstracts centralized in `src/data/papersData.ts`
- GitHub Pages deployment workflow

## Edit content

Most future edits only require two files:

- `src/data/papersData.ts` — papers, abstracts, arXiv IDs, tags, explanations
- `src/data/siteData.ts` — name, email, short bio

To add a paper:

1. Put the PDF in `public/papers/`.
2. Add a first-page image to `public/previews/`.
3. Add one object to `PAPERS` in `src/data/papersData.ts`.

The `explanation` field is optional. Until you add it, the public explanation page displays a simple "coming soon" state instead of generated content.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial research site"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

### GitHub Pages

A workflow is already included at `.github/workflows/deploy.yml`.

After pushing:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` whenever you want to redeploy.

The Vite configuration uses relative asset paths, so it works for both `username.github.io/repository-name/` and a future custom domain.

## PDF reader note

Desktop Chrome/Edge/Firefox/Safari generally embed the PDFs directly. Mobile PDF behavior varies by browser, so the reader also provides an **Open PDF** fallback.
