/**
 * This script mirrors source files into ../demos-npm.
 */
import cpy from 'cpy';
import { deleteSync } from 'del';
import { replaceInFileSync } from 'replace-in-file';
const destinationRoot = `../demos-npm`;
const destination = `${destinationRoot}/src`;

// Delete previous src
deleteSync([ destination ], { force: true });

const categories = `audio camera data dom flow geometry io ml modulation pointer starters visuals random`.split(` `);

// Copy sketches
for (const c of categories) {
  await cpy([ `${c}/**/*` ], `${destination}/${c}`);
}

// Re-write imports
// replaceInFileSync({
//   files: `${destination}/**/*.js`,
//   from: /^(import.*?["'])((?:@ixfx[^"']+))\.js(["'])/gm,
//   to: `$1$2$3`,
// });

// Replaces to 'ixfx/module' not needed now
// replaceInFileSync({
//   files: `${destination}/**/*.js`,
//   from: /^(import.*?["'])((?:@ixfx[^"']+))\.js(["'])/gm,
//   to: `$1$2$3`,
// });


replaceInFileSync({
  files: `${destination}/**/*.js`,
  // from: /^import.*['"]@ixfx['"]/,
  from: /from\s+['"]@ixfx['"]/g,
  to: `from 'ixfx/core.js'`,
});

// Copy loose files
await cpy([ `index.html`, `favicon.ico`, `demos.css`, `base.css` ], `${destination}/`);
await cpy([ `./.vscode/settings.json`, `./.vscode/extensions.json` ], `${destinationRoot}`);


await cpy([ `eslint.config.mjs` ], `${destinationRoot}/`);

// Copy demos/jsconfig.json to demos/src/jsconfig.json
//await cpy([ `${destinationRoot}/jsconfig.json` ], `${destination}/`, { flat: true });

console.log(`copy-for-npm done`);
