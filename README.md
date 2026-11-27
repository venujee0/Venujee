# Venu JEE

Bilingual (Hindi / English) JEE study-book website.

## Run locally

Serve this repository with any static HTTP server and open `index.html`. The modular loader uses ordered classic scripts; opening through a local HTTP server is recommended over `file://`.

## Project structure

```text
index.html
styles.css
mock-test-engine.js
build.py
src/
  core/                 storage, theme, language preferences
  classes/
    class-11/
      content-loader.js      ordered module loader
      content-extensions.js  chapter metadata/extension wiring
      chemistry/
        chapter-01-mole-concept/
          index.js            chapter shell
          topics/             one file per topic/section
          examples/           one file per solved example
          formulas/           one file per formula entry
          exercises/          exercise section files
          diagrams-2d/        individual topic diagrams
          models-3d/           individual interactive model files
          photos/              individual real-photo references
      physics/
        chapter-01-units-dimensions/ (same layout)
      mathematics/
        chapter-01-sets/ (same layout)
    class-12/                 reserved structure; content not migrated
  features/
    books/navigation.js       book, notes, page and route navigation
  visuals/
    engines/                  shared 3D renderer and registries
    diagrams/                 shared 2D renderer and flow primitive
assets/                       styles and image assets
docs/                         architecture and maintenance notes
tests/                        structural validation guidance
```

## Modular loading

`index.html` loads shared preferences and visual engines, then `src/classes/class-11/content-loader.js`. The loader sequentially loads chapter shells, each chapter's model/content files, photo and diagram modules, extension wiring, application bootstrap, navigation and the separate Mock Test route.

Run `python build.py` to validate local index references and every path in the sequential loader manifest. This is a structural check, not a browser/device test.
