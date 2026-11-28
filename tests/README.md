# Tests

Run the following from the repository root:

```sh
python build.py
node tests/check-js-syntax.mjs
```

The structural validator checks required root files, local `index.html` references and every path in the sequential loader manifest. The Node script runs `node --check` against every active loader module.

These checks do not execute a browser, validate rendered layouts, test touch interactions, or prove academic correctness. Those still require browser/device and subject-matter testing.
