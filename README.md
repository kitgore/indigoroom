# IndigoRoom Static Svelte Site

This project is a static Svelte site ready for deployment on GitHub Pages, with [Decap CMS](https://decapcms.org/) as a headless CMS.

## Features
- SvelteKit with static adapter
- Decap CMS at `/admin` for content management
- Ready for GitHub Pages deployment

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the dev server:**
   ```bash
   npm run dev
   ```
3. **Access Decap CMS:**
   Visit [http://localhost:5173/admin](http://localhost:5173/admin)

## Static Build
To build the site for static hosting:
```bash
npm run build
```
The output will be in the `build/` directory.

## Deploying to GitHub Pages
1. Push your repository to GitHub.
2. Configure GitHub Pages to serve from the `build/` directory (see SvelteKit docs for details).

## Decap CMS Configuration
- CMS config: `static/admin/config.yml`
- Content files: `src/content/`

## Customization
- Edit `src/routes/+page.svelte` for the homepage.
- Add more collections to `config.yml` as needed.

---
