# Indigo Room

A static website built with Svelte and hosted on GitHub Pages.

## Development

To run the development server:

```bash
npm install
npm run dev
```

## Building for Production

To build the site for production:

```bash
npm run build
```

This will create a `dist` directory with the static files ready for deployment.

## Deploying to GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to your repository settings on GitHub
3. Navigate to "Pages" in the sidebar
4. Under "Source", select "Deploy from a branch"
5. Select the `gh-pages` branch (create it if it doesn't exist)
6. Select the root folder and click "Save"

To deploy manually:
1. Create a `gh-pages` branch if it doesn't exist
2. Copy the contents of the `dist` directory to the root of the `gh-pages` branch
3. Commit and push the changes

The site will be available at `https://[your-username].github.io/indigoroom/`
