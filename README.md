<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-TTTUio8QcM-Td6_q8aqrg4mdBaiZ5Tn

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Production build

1. Install dependencies:
   `npm install`
2. Build:
   `npm run build`
3. Preview locally:
   `npm run preview`

## Deployment (praanacoil.com)

This project uses `BrowserRouter` for clean URLs like:
- `/shipping-policy`
- `/privacy-policy`
- `/terms-and-conditions`
- `/warranty-claims`
- `/contact-us`

Your hosting must be configured to rewrite all routes to `index.html` (SPA fallback).

### Netlify
- `netlify.toml` and `public/_redirects` are included.
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel
- `vercel.json` is included to rewrite routes.
- Framework: Vite
- Build command: `npm run build`
- Output: `dist`

### SEO files
- `public/robots.txt`
- `public/sitemap.xml`
