# jakub-boucek.cz

Personal static website, deployed to Firebase Hosting via GitHub Actions.

## Build

- **Vite** is the only build tool (`npm run dev` / `build` / `preview`), output in `dist/` (gitignored).
- HTML entry points live in the project root: `index.html` and `cv/index.html`
  (both configured in `vite.config.js`). `public/404.html` is self-contained
  (inline styles) and is copied verbatim, like everything else in `public/`.
- `src/main.js` is the single JS entry; it imports `style.scss` (CSS is
  extracted at build time). No jQuery, no Bootstrap JS — the only script
  on the site is the vanilla bank-box toggle.
- Styles: **Bootstrap 5** (Sass), customized in `src/bootstrap.scss`. Only the
  modules the site uses are imported there — no content-based tree-shaking in
  Bootstrap, pruning is manual via the import list.

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
  package with `--no-save` and copy the path from `icons.json`.
- The bank box is state-driven: JS only toggles `.open` on `#bank-box`
  (plus `aria-expanded`); CSS decides visibility of `.only-more`/`.no-more`
  and the two zoom icons, and animates via a grid-template-rows 0fr/1fr
  transition (collapsible elements need a single wrapper child with
  `overflow: hidden`).

## Gotchas

- **firebase.json `ignore`**: must NOT contain `**/assets/**` (Vite bundles
  live in `dist/assets/`) nor `**/.*` (would skip `.well-known/`).
- Sass deprecation noise from Bootstrap is silenced in `vite.config.js`
  (`quietDeps`, `silenceDeprecations: ['import']`).

## Planned iterations (agreed with the user, do not do preemptively)

1. PurgeCSS on top of the current build (safelist: only `d-none` toggled by
   the bank-box script; CSS is ~112 kB because full BS5 utilities are
   compiled in).

Done: jQuery removed (vanilla bank-box toggle), Bootstrap 3 → 5 upgrade
with Less → Sass migration, glyphicons → inline SVG icons.
