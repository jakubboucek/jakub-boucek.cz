# jakub-boucek.cz

Personal static website, deployed to Firebase Hosting via GitHub Actions.

## Build

- **Vite** is the only build tool (`npm run dev` / `build` / `preview`), output in `dist/` (gitignored).
- The single HTML entry point is `index.html` in the project root (Vite
  default, no rollupOptions needed). `static/404.html` is self-contained
  (inline styles) and is copied verbatim, like everything else in `static/`
  (the Vite publicDir, renamed for clarity). The former `/cv` page was
  deleted in 2026-08 as outdated — recoverable from git history.
- `src/main.js` is the single JS entry; it imports `style.scss` (CSS is
  extracted at build time). No jQuery, no Bootstrap JS — the only script
  on the site is the vanilla bank-box toggle.
- Styles: **Bootstrap 5** (Sass), customized in `src/bootstrap.scss`. Only the
  modules the site uses are imported there, and **PurgeCSS** (postcss plugin
  in `vite.config.js`, production build only) strips everything the HTML/JS
  doesn't reference (~112 kB -> ~14 kB). Runtime-toggled classes must be in
  its `safelist` (currently just `open`).

## Design decisions (visual parity with the old Bootstrap 3 site)

- `src/bootstrap.scss` variable values are ported from the compiled BS3
  stylesheet (14px base font, BS3 line-height, #666 text, 750px container,
  30px gutter, 4px/6px radii, 85% `small`). `$enable-rfs` and
  `$enable-smooth-scroll` are off — BS3 had neither.
- BS3's `sm` breakpoint (768px) maps to BS5's `md`; HTML uses `col-md-*`,
  `order-md-*`, `d-none d-md-block`. The container is fluid below `md`.
- `.btn-default` doesn't exist in BS5 — recreated via `button-variant` mixin.
- `header.main` needs `display: flow-root`: BS3 containers had a clearfix
  that kept the h1 margins inside the header; BS5 dropped it.
- BS3 drew table row separators *above* rows, BS5 *below* — the last-row
  border is stripped in `bootstrap.scss` so the lines land identically.
- Icons are inline Material Symbols SVGs in the HTML (from
  `@iconify-json/material-symbols`, Apache-2.0; glyphicons were removed in
  BS5); no icon font, no runtime Iconify. To add an icon, install that
  package with `--no-save` and copy the path from `icons.json`. Sizing is
  the `.icon` CSS class (1.2em: Material's 24-grid has 2/24 padding per
  side, glyphicon ink filled the whole em box).
- The bank box is state-driven: JS only toggles `.open` on `#bank-box`
  (plus `aria-expanded`); CSS decides visibility of `.only-more`/`.no-more`
  and the two zoom icons, and animates height 0/auto via `interpolate-size`
  (no animation in browsers without it). The collapsibles use
  `overflow: clip`, NOT `hidden`, on purpose: hidden/grid would create a
  BFC, which shrinks next to the floated `.action-box` button — the QR
  image then cannot span the full block width (the old BS3 layout simply
  overlapped the float).

## Gotchas

- **firebase.json `ignore`**: must NOT contain `**/assets/**` (Vite bundles
  live in `dist/assets/`) nor `**/.*` (would skip `.well-known/`).
- Sass deprecation noise from Bootstrap is silenced in `vite.config.js`
  (`quietDeps`, `silenceDeprecations: ['import']`).

## Modernization history (all planned iterations done)

Grunt -> Vite build, jQuery removed (CSS-state bank-box toggle),
Bootstrap 3 -> 5 with Less -> Sass, glyphicons -> inline Material Symbols
SVGs, PurgeCSS.
