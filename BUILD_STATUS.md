# Venu JEE — Modular Migration Status

## Working branch

`main`

The active website is maintained on `main`. Keep fixes on this branch unless the owner explicitly approves a branch change.

## Runtime map

- `index.html`: loads shared preferences and visual engines, then the sequential Class 11 content loader.
- `src/core/storage.js`, `theme.js`, `language.js`: separate preference modules.
- `src/visuals/engines/registry.js`: shared chapter, 3D and diagram registries.
- `src/visuals/engines/3d-engine.js`: shared interactive 3D renderer and controls.
- `src/visuals/diagrams/diagram-renderer.js` and `flow.js`: shared 2D renderer and flow-diagram primitive.
- `src/classes/class-11/<subject>/<chapter>/index.js`: chapter shell and subject-level helper setup.
- `topics/`: individual topic/section registration files.
- `examples/`: individual solved-example registration files.
- `formulas/`: individual formula registration files.
- `exercises/`: exercise section registration files.
- `models-3d/`: one JavaScript file per interactive model.
- `diagrams-2d/`: one JavaScript file per topic-specific 2D flow diagram.
- `photos/`: individual real-apparatus photo reference modules.
- `src/classes/class-11/content-extensions.js`: additional chapter content, photo attachment and diagram-to-topic wiring.
- `src/features/home/home.js`: home shelf.
- `src/features/chapter-list/class-view.js`: class and subject shelf.
- `src/features/books/book-model.js`: chapter ordering, page map and page URL model.
- `src/features/notes/page-renderer.js`: cover, topic, formula, example and notes page composition.
- `src/features/books/navigation.js`: route controller, page-turn controls, language refresh and app event wiring.
- `mock-test-engine.js`: separate Mock Test/PYQ route shell; left unchanged.

## Class 11 content inventory in the active loader

| Subject | Chapter | Topic files | Solved examples | Formula files | Exercise sections | 3D models | 2D topic diagrams |
|---|---|---:|---:|---:|---:|---:|---:|
| Chemistry | Some Basic Concepts of Chemistry (Mole Concept) | 28 | 33 | 16 | 1 | 12 | 6 |
| Physics | Units, Dimensions and Measurement | 40 | 31 | 8 | 1 | 11 | 4 |
| Physics | Motion in a Straight Line | 20 | 20 | 8 | 1 | 3 | 4 |
| Mathematics | Sets | 23 | 25 | 8 | 1 | 9 | 3 |
| **Total** | | **111** | **109** | **40** | **4** | **35** | **17** |

There are also 3 real-apparatus photo reference modules (Vernier caliper, screw gauge and titration). The loader currently lists 333 sequential scripts, including chapter shells, individual content and visual modules, app bootstrap, navigation and Mock Test route.

## Remaining architecture work

- Split remaining route-controller responsibilities (hash routing, pager/touch/keyboard events and progress/bookmark/search) into smaller modules. Home, class shelf, book model and Notes page renderer are already separate.
- Split the shared 2D companion-diagram data registry further if a future chapter requires independently maintained model companion drawings. The common renderer is separate and the 13 topic-specific flow diagrams are already separate.
- Archived inactive root-level legacy duplicates under `legacy/` for historical comparison. They are not loaded by the active entrypoint; `legacy/inactive-99-books-navigation.js` fails a standalone syntax parse and must not be loaded.
- Class 12 chapter content is not migrated/populated.
- Mock Test and PYQ question banks remain empty placeholders; no changes were made to their engine.
- Full academic proofreading of every answer and diagram remains pending.

## Structural verification

- `index.html` local file references and all 333 sequential loader paths were checked against the branch tree; none were missing.
- JavaScript parser checks passed for the app bootstrap, navigation, content loader, chapter shells, shared visual engines, extension module and generated topic/example/formula/model/diagram/photo modules at creation time.
- `app.js` is now about 2.9 KB, down from about 254 KB at the start of this branch. Navigation is in `src/features/books/navigation.js` (about 19.7 KB).
- `build.py` checks required root files, index references and every path in the sequential loader manifest.

## Not yet verified

- No real browser or Android device session has been run in this migration. Syntax/path checks do not prove page turns, language switching, image loading, 3D rendering, slider controls or touch interactions work visually.
- No end-to-end visual acceptance test or independent academic proofread has been completed.
