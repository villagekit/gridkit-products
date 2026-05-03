# `@villagekit/products`

A catalogue of grid-beam designs — desks, shelves, beds, chairs, and more — written as parametric TypeScript using the [`@villagekit/gridkit`](https://github.com/villagekit/gridkit) engine.

Powers the designs catalog at [gridbeam.xyz/designs](https://gridbeam.xyz/designs).

## Layout

Each design lives in `products/<id>/` and consists of:

| File | Purpose |
|------|---------|
| `villagekit.toml` | Metadata: name, label, description, tags, entry file (`exports`). |
| `<id>.ts` | The design itself — exports `parameters`, `parts`, `presets`, optionally `plugins`. The actual filename is whatever the toml's `exports` field points at; by convention (and what the plop template generates) it's `<id>.ts`. |
| `<id>.png` | Render of the default preset. LFS-tracked. |

```
products/
  work-table/
    villagekit.toml
    work-table.ts
    work-table.png
  ...
```

## How the website consumes the catalog

[gridbeam.xyz](https://github.com/villagekit/gridbeam.xyz) reads this catalogue directly from the filesystem (this repo is checked in there as a git submodule). The `.toml` is parsed for metadata, and the `.ts` source is loaded as text and evaluated inside the engine's runtime sandbox. There is no `pnpm add @villagekit/products` step today.

If/when third-party consumption emerges, this catalogue would gain a build pipeline and ship to npm — but that is deliberately deferred while the engine packages it depends on are still pre-publish.

## Adding a new design

```sh
pnpm install
pnpm run generate:kit
```

Plop will scaffold `products/<id>/` from the templates in `templates/kit/`. Fill in the `.ts` to describe your parts, and drop a render in as `<id>.png`.

## Authoring against the engine

Designs import from the engine's published API:

- `@villagekit/design/kit` — `Params`, `Part`, `Parts`, `PartsFn`, `Plugins`, `Presets` types
- `@villagekit/part-gridbeam/creator` — `GridBeam` factory
- `@villagekit/part-gridpanel/creator` — `GridPanel` factory
- `@villagekit/part-fastener/creator` — fastener factories

The local `tsconfig.json` and `biome.json` resolve the engine via a sibling `../villagekit/` path — that matches the repo layout used during standalone authoring. Inside the gridbeam.xyz monorepo the engine is at `../gridkit/` and the website doesn't typecheck the design files (they're read as raw source), so the path mismatch is harmless there.

## License

[Blue Oak Model License 1.0.0](./LICENSE) — permissive, suited to a catalogue of designs that we want to be reusable without the share-alike obligations the rest of the village-kit codebase carries (the engine, the standalone UI library, and the website are EUPL-1.2).
