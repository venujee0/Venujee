#!/usr/bin/env python3
from pathlib import Path
root=Path(__file__).resolve().parents[1]
parts=[
 'assets/js/core/00-language-manager.js',
 'assets/js/core/00-ui-and-diagram-helpers.js',
 'assets/js/data/01-chapter-registry.js',
 'assets/js/core/01-chapter-render-helpers.js',
 'assets/js/core/90-3d-engine.js',
 'assets/js/data/chapters/class-11/chemistry/ch01-mole-concept.js',
 'assets/js/data/chapters/class-11/physics/ch01-units-dimensions.js',
 'assets/js/data/chapters/class-11/mathematics/ch01-sets.js',
 'assets/js/core/99-books-navigation.js',
]
chunks=[]
for rel in parts:
 p=root/rel
 if not p.is_file(): raise SystemExit(f'Missing source module: {rel}')
 chunks.append(p.read_text(encoding='utf-8'))
(root/'assets/js/app.js').write_text('\n'.join(chunks),encoding='utf-8')
print('Built assets/js/app.js from',len(parts),'source modules (no lesson/question/diagram data)')
