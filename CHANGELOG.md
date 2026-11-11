# Changelog

All notable changes to @romatech/order-by will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [2.1.0] - 2026-11-11

### Breaking
- No change to the exported API or to `index.d.ts`. The sort-key fix below
  changes where `null` keys end up; read the **Behavior change** note before
  upgrading.

### Security
- No runtime dependencies; `npm audit --omit=dev` reports 0 vulnerabilities.
- Dev dependencies (Jest 29 tree) updated within their semver ranges, which
  removes the high and moderate advisories. Six low advisories remain in
  `jest` → `deepmerge`; they need Jest 30 (major) and do not ship in the package.

### Fixed
- Sorting by a key that was `undefined` or `NaN` for some items made the
  comparator inconsistent, so the result could come back unsorted (keys
  `[3, undefined, 1, 2]` stayed `[3, undefined, 1, 2]`, and `[3, NaN, 1, 2]`
  stayed `[3, NaN, 1, 2]`).
- `repository`, `homepage` and `bugs` in `package.json`, and the GitHub link on
  the landing page, pointed to `RomaTech-LTDA/order-by`, which does not exist
  (404). They now point to `leandroromanelli/order-by`.
- README: removed the stray characters from the TypeScript typings example.

### Changed
- **Behavior change:** `null`, `undefined` and `NaN` sort keys are equal to each
  other and smaller than every other key: they come first with
  `orderBy`/`thenBy` and last with `orderByDesc`/`thenByDesc`, as `null` does
  in C#. Before, a `null` key was compared as `0`, so it now moves before
  negative numbers: `[-1, null, 1]` used to stay in that order and now becomes
  `[null, -1, 1]`. Keys of mixed types (numbers and strings) still have no
  defined order. Selectors still receive only the item.
- Landing page (`index.html`, GitHub Pages only, not in the package) moved to the
  shared template.
- CI runs `npm ci` and the tests on Node 22 and 24 with read-only permissions;
  `.nvmrc` is now 22 (Node 20 is end of life). The publish workflow uses
  `npm ci` on Node 22, and the GitHub release is created with `gh` in a
  separate job that has `contents: write` but no access to `NPM_TOKEN` (the
  third-party `softprops/action-gh-release` action is no longer used). The
  publish trigger is unchanged: a push to `main` that changes `package.json`
  with a version not yet on npm (the `src/**` and `tsconfig.json` path filters
  were dropped because those files do not exist).

## Earlier releases

Detailed notes were not kept for earlier versions. Published to npm:
1.0.0 (2025-07-07), 1.1.0 and 1.1.1 (2025-07-08), 1.3.0 and 1.3.1 (2026-06-25)
and 2.0.0 (2026-06-26). This file previously had a `[1.2.0] - 2026-06-18`
entry; that version was never published.
