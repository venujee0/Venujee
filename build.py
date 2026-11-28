#!/usr/bin/env python3
"""Validate Venu JEE's modular static-script architecture."""
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
INDEX = ROOT / "index.html"
REQUIRED = ("index.html", "styles.css", "app.js", "mock-test-engine.js")

def main() -> int:
    missing = [name for name in REQUIRED if not (ROOT / name).is_file()]
    if missing:
        print("Missing required files: " + ", ".join(missing), file=sys.stderr)
        return 1
    html = INDEX.read_text(encoding="utf-8")
    refs = re.findall(r'''(?:src|href)\s*=\s*["']([^"']+)["']''', html, re.I)
    local = []
    for ref in refs:
        parsed = urlsplit(ref)
        if parsed.scheme or parsed.netloc or ref.startswith(("#", "data:")):
            continue
        if parsed.path:
            local.append(parsed.path)
    missing_refs = sorted({p for p in local if not (ROOT / p).is_file()})
    if missing_refs:
        print("index.html has missing local references: " + ", ".join(missing_refs), file=sys.stderr)
        return 1
    loader = ROOT / "src/classes/class-11/content-loader.js"
    if not loader.is_file():
        print("Missing sequential content loader.", file=sys.stderr)
        return 1
    source = loader.read_text(encoding="utf-8")
    match = re.search(r"var files=(\[[\s\S]*?\]);", source)
    if not match:
        print("Could not read content-loader manifest.", file=sys.stderr)
        return 1
    import json
    try:
        manifest = json.loads(match.group(1))
    except json.JSONDecodeError as exc:
        print(f"Invalid content-loader manifest: {exc}", file=sys.stderr)
        return 1
    absent = [p for p in manifest if not (ROOT / p).is_file()]
    if absent:
        print("Content loader references missing files: " + ", ".join(absent), file=sys.stderr)
        return 1
    if "app.js" not in manifest or "src/features/books/navigation.js" not in manifest:
        print("Application/navigation modules missing from loader.", file=sys.stderr)
        return 1
    print("Validation passed.")
    print(f"Checked {len(local)} index references and {len(manifest)} sequentially loaded modules.")
    print("This validator checks paths and manifest integrity; it does not replace browser/device testing.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
