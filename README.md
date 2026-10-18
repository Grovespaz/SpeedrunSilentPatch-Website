# SpeedrunSilentPatch website

Friendly SSP download page for those fearful of Github.

## Development

- `npm install` - duh
- `npm run dev` - opens the server on http://127.0.0.1:3000
- `npm run typecheck`
- `npm run build` - generates a static site in `out/`
- `npm run sync:release` - Makes sure the download buttons point to the latest release
- `npm run prepare:images` - converts source artwork into optimized banners and icons in `public/images/`.
- `npm run sync:fixes` - updates `src/data/fixes.json` from `G:\GTA\SilentSpeedPatch\SilentPatch\README.md`. To use another checkout, run `npm run sync:fixes -- "path/to/SilentPatch/README.md"`.

## Editing

- `src/data/games.ts`: compatibility, FAQ copy, game identity and leaderboard links.
- `src/data/fixes.json`: included fixes, generated from the SSP README with `npm run sync:fixes`.
- `src/data/release.json`: GitHub release metadata and direct game ZIP URLs.
- `src/app/globals.css`: shared visual design and game palettes.
- `source-images/`: original artwork; optimized copies are in `public/images/`.
