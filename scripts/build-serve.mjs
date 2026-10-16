import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'dist/findingsteel-steel-sections-mcp.mjs';

await build({
  entryPoints: ['src/serve.ts'],
  outfile: file,
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  sourcemap: false,
  minify: false,
  logLevel: 'silent',
});

// esbuild preserves the entry shebang; normalise so it appears exactly once as line 1.
let content = readFileSync(file, 'utf8');
content = content.replace(/^#!.*\n/, '');           // strip any existing shebang
writeFileSync(file, '#!/usr/bin/env node\n' + content, 'utf8');

const head = readFileSync(file, 'utf8').split('\n').slice(0, 3);
console.log('L1:', JSON.stringify(head[0]));
console.log('L2:', JSON.stringify(head[1]));
console.log('built ok');
