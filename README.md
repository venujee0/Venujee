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
      content-loader.js
      content-extensions.js
      chemistry/
        chapter-01-mole-concept/
          index.js      chapter shell + 3D model definitions
          topics/       one file per topic/section
          examples/     one file per solved example
          formulas/     one file per formula entry
          exercises/    exercise sections
          diagrams-2d/  chapter diagram assets/modules (migration ongoing)
          models-3d/    chapter 3D assets/modules (migration ongoing)
          photos/       chapter photo assets/modules (migration ongoing)
      physics/
        chapter-01-units-dimensions/ (same layout)
      mathematics/
        chapter-01-sets/ (same layout)
    class-12/            reserved structure; content not yet migrated
  features/
    books/navigation.js book pages, routing and notes navigation
  visuals/
    engines/             shared 3D renderer + registries
    diagrams/            shared bilingual 2D diagram renderer
assets/                   styles and image assets
docs/                     architecture and maintenance notes
tests/                    validation guidance
```

## Modular loading

`index.html` loads the small shared core and visual runtime first. `src/classes/class-11/content-loader.js` then loads chapter shells, individual topic/example/formula files, visual registrations, the application bootstrap, book navigation and the separate mock-test route in dependency order.

Run `python build.py` to validate local index references and every path in the sequential loader manifest. This is a structural check, not a browser/device test.
