# Tests

Run `python build.py` from the repository root.

The validator checks:
- required root entry files;
- every local `src` / `href` in `index.html`;
- the JSON manifest embedded in `src/classes/class-11/content-loader.js`;
- existence of every script loaded sequentially.

It does not execute a browser, validate rendered layouts, test touch interactions, or prove academic correctness. Those require browser/device and subject-matter testing.
