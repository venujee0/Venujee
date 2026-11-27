# Build Status — current project snapshot

## Class 11 chapter content

The runtime chapter content is currently included in `app.js`.

| Subject | Chapter | Sections | Solved examples | Practice questions | 3D definitions |
|---|---|---:|---:|---:|---:|
| Chemistry | Some Basic Concepts of Chemistry (Mole Concept) | 23 | 23 | 22 | 12 |
| Physics | Units, Dimensions and Measurement | 31 | 23 | 22 | 11 |
| Mathematics | Sets | 19 | 20 | 24 | 9 |

These are source-code inventory counts. They do not mean every answer, explanation, formula, or animation has been independently quality-checked or tested in a browser.

## Pending content

- Class 12 chapter content has not been added yet.
- Mock Test question banks are empty (`window.VENU_TESTS` has no tests yet).
- JEE Main and JEE Advanced PYQ pages are navigation placeholders; question papers have not been added.
- These are planned content additions, not build errors.

## Navigation and runtime

- `index.html` loads `styles.css`, `app.js`, and `mock-test-engine.js` from the repository root.
- The compact `⌂ Home` link is in the shared top header. It is shown on non-home routes, including chapter and Mock Test/PYQ pages, and returns to `#home`.
- The separate `ch01-mole-concept.js`, `ch01-units-dimensions.js`, and `ch01-sets.js` files are present in the repository but are not loaded by `index.html`. The active runtime content is in `app.js`; these separate files still need reconciliation before changing or removing them.
- `build.py` is a root-layout validator. It checks required files and local references; it is not a bundler.

## Verification still needed

- Run `python build.py` and confirm the validator passes.
- Test the site in a browser, including the Home link on chapter, Mock Test, and PYQ routes.
- Test the bilingual switch and 3D animations on an Android device.
- Independently review chapter solutions and question answers for correctness.
