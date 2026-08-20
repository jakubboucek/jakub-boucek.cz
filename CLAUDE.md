# jakub-boucek.cz

Personal static website, deployed to Firebase Hosting via GitHub Actions.

## Build

- **Vite** is the only build tool (`npm run dev` / `build` / `preview`), output in `dist/` (gitignored).
- HTML entry points live in the project root: `index.html` and `cv/index.html`
  (both configured in `vite.config.js`). `public/404.html` is self-contained
  (inline styles) and is copied verbatim, like everything else in `public/`.
- `src/main.js` is the single JS entry; it imports `style.less` (CSS is
  extracted at build time) and the Bootstrap 3 plugins used by the site.

## Gotchas

- **Bootstrap 3 + Less 4**: requires `math: 'always'` in Vite's less options,
  otherwise Bootstrap's un-parenthesized divisions break.
- **jQuery global**: Bootstrap 3 plugin files reference the `jQuery` global.
  `src/jquery-global.js` sets `window.jQuery`/`window.$` and must stay imported
  in `main.js` *before* any `bootstrap/js/*` import.
- **Glyphicon fonts**: `@icon-font-path` in `src/bootstrap.less` points into
  `node_modules/bootstrap/fonts/`; Vite resolves and emits them hashed —
  no manual font copy step.
- **firebase.json `ignore`**: must NOT contain `**/assets/**` (Vite bundles
  live in `dist/assets/`) nor `**/.*` (would skip `.well-known/`).
- Unused Bootstrap components are pruned manually via commented-out imports
  in `src/bootstrap.less` (Bootstrap has no content-based tree-shaking).

## Planned iterations (agreed with the user, do not do preemptively)

1. PurgeCSS on top of the current build (needs a safelist for JS-toggled
   classes: `active`, `in`, `fade`, `collapsing`, glyphicon states).
2. Bootstrap 3 → 5 upgrade, including Less → Sass migration and HTML class
   renames; glyphicons replaced (removed in BS5).
3. Drop jQuery: rewrite tabs + the `#bank-show-more` toggle in vanilla JS.
