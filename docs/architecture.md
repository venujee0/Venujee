# Architecture and load order

Venu JEE is currently a dependency-ordered set of browser classic scripts (not an ES-module bundler).

## Entry sequence

1. `index.html` loads shared storage, theme and language preferences.
2. It loads the shared visual registry, 3D engine and 2D renderer.
3. `src/classes/class-11/content-loader.js` loads scripts sequentially. It loads the three chapter shells, then 32 model files, then each topic/example/formula/exercise registration, photo and 2D diagram modules, then Class 11 extension wiring.
4. It loads the small `app.js` bootstrap, book model, Notes page renderer, home and class-shelf views, navigation controller and the separate Mock Test route.

## Registries and contracts

- `window.VENU_CHAPTERS_DATA`: ordered chapter objects. A chapter shell creates the object; each topic/example/formula file appends one record to the corresponding array.
- `window.VENU_D3`: interactive model definitions. Each model file registers one key.
- `window.VENU_DG`: 2D flow-diagram definitions.
- `window.VENU_PHOTOS`: real-apparatus photo metadata.
- `window.VENU_RUNTIME`: shared application helpers initialized by `app.js` before feature modules are used.

Do not reorder the loader casually: chapter shells must precede content records; visual registries must exist before their model/diagram registrations; all content and registrations must load before the navigation controller renders the first route.

## Editing content

- Add a new topic as a file in that chapter's `topics/` folder and append it to the chapter's `sections` array.
- Add each solved example as a separate file in `examples/`.
- Add each formula entry as a separate file in `formulas/`.
- Put practice/exercise section data in `exercises/`.
- Put each interactive 3D model in `models-3d/`.
- Put chapter-specific 2D flow diagrams in `diagrams-2d/`.
- Put real photo metadata in `photos/` and retain attribution/licence details.
- Add the path to the sequential manifest in `content-loader.js` at the correct dependency position.

Run `python build.py` and `node tests/check-js-syntax.mjs` after edits. These are structural/syntax checks; browser and Android interaction tests are still required before merging.
