# Build Status — current project snapshot

## Runtime file map

```text
index.html
 ├── styles.css                 Shared layout, typography, themes, diagrams and responsive rules
 ├── app.js                     Active Class 11 study-book application and chapter content
 │    ├── shared language / theme / storage helpers
 │    ├── 2D SVG diagram registry (DG) + 2D companions for interactive 3D models
 │    ├── Class 11 Chemistry: Some Basic Concepts of Chemistry (Mole Concept)
 │    ├── Class 11 Physics: Units, Dimensions and Measurement
 │    ├── Class 11 Mathematics: Sets
 │    ├── book / chapter / page rendering and navigation
 │    └── window.VENU_CHAPTERS bridge for Mock Test chapter navigation
 └── mock-test-engine.js        Separate Mock Test / PYQ route shell (question bank not populated)

build.py                         Root-file and local-reference validator; not a bundler
BUILD_STATUS.md                  This project map and verification notes

ch01-mole-concept.js             Legacy / standalone chapter file; NOT loaded by index.html
ch01-units-dimensions.js         Legacy / standalone chapter file; NOT loaded by index.html
ch01-sets.js                     Legacy / standalone chapter file; NOT loaded by index.html
```

**Important:** the three `ch01-*.js` files are not the active source of the displayed chapters. The active runtime chapter data is embedded in `app.js`. Do not edit a standalone chapter file expecting the live website to change. These duplicate files need a deliberate reconciliation/migration plan before they can safely become active modules.

## Active Class 11 chapter inventory

| Subject | Chapter | Sections | Solved examples | Practice questions | Interactive 3D definitions |
|---|---|---:|---:|---:|---:|
| Chemistry | Some Basic Concepts of Chemistry (Mole Concept) | 29 | 33 | 22 | 12 |
| Physics | Units, Dimensions and Measurement | 41 | 31 | 22 | 11 |
| Mathematics | Sets | 25 | 25 | 24 | 9 |

Counts are source inventory after the latest additions; they are not proof that every explanation, numerical answer, diagram, or interactive animation has been visually/browser tested.

## Diagrams and visual assets

- Existing interactive 3D topics are paired with 2D companion drawings through the shared chapter renderer.
- Topic-specific static 2D diagrams are registered in `DG` and assigned to selected sections without an existing 3D model.
- Real apparatus reference photos currently cover Vernier calipers, screw gauge and titration setup.
- A 2D process diagram is a conceptual summary; it is not a substitute for a measured instrument scale drawing or a realistic 3D model.

## Known product/content boundaries

- Class 12 chapter content has not been added yet.
- Mock Test question banks are empty; `mock-test-engine.js` currently provides navigation/Coming Soon states only.
- JEE Main and JEE Advanced PYQ pages are navigation placeholders; papers/questions have not been added.
- These are planned content gaps, not JavaScript syntax errors.
- The app is currently a compact root-level static website, not a fully split feature/module architecture.

## Navigation and runtime

- `index.html` loads `styles.css?v=6`, `app.js?v=16`, and `mock-test-engine.js`.
- The shared top header contains the Home link; the study-book app owns chapter/page navigation.
- `mock-test-engine.js` listens for hash changes and renders Mock Test/PYQ placeholder routes in the same `#app` element.
- The chapter data bridge is `window.VENU_CHAPTERS`; Mock Test chapter navigation reads this list.
- `build.py` checks required root files and local references from `index.html`; it does not rebuild `app.js` from the legacy chapter files.

## Verification status

- Latest `app.js` JavaScript parse check: passed with `new Function(app.js)`.
- Latest `mock-test-engine.js` JavaScript parse check: passed with `new Function(mock-test-engine.js)`.
- `index.html` local runtime references: checked against the repository's required root files.
- Mock Test engine source hash remains unchanged during the recent Class 11 content/diagram edits.
- Actual browser/Android testing of every route, page turn, language switch, image load, slider control and 3D interaction is still pending.
- Independent full academic proofread of every answer and diagram is still pending.
