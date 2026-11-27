#!/usr/bin/env python3
"""Validate the checked-in, root-level Venu JEE website files.

The project currently ships app.js as a ready-to-serve bundle. The former
assets/js/* source tree no longer exists, so this script must not try to
rebuild app.js from those removed modules.
"""
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
INDEX = ROOT / "index.html"

REQUIRED_FILES = (
    "index.html",
    "styles.css",
    "app.js",
    "mock-test-engine.js",
)

def main() -> int:
    missing = [name for name in REQUIRED_FILES if not (ROOT / name).is_file()]
    if missing:
        print("Missing required project file(s): " + ", ".join(missing), file=sys.stderr)
        return 1

    html = INDEX.read_text(encoding="utf-8")
    refs = re.findall(r'''(?:src|href)\s*=\s*["']([^"']+)["']''', html, re.I)
    local_refs = []
    for ref in refs:
        parsed = urlsplit(ref)
        if parsed.scheme or parsed.netloc or ref.startswith(("#", "data:")):
            continue
        path = parsed.path
        if path:
            local_refs.append(path)

    missing_refs = sorted({path for path in local_refs if not (ROOT / path).is_file()})
    if missing_refs:
        print("index.html references missing local file(s): " + ", ".join(missing_refs), file=sys.stderr)
        return 1

    print("Validation passed.")
    print("All required root-level files and local index.html references exist.")
    print("app.js is the committed runtime bundle; no source-module rebuild is configured.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
