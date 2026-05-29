import { copy, ensureDir } from 'fs-extra';
import { dirname, join } from 'node:path';

const rootDir = process.cwd();

// source file
const srcFile = join(rootDir, 'bot-template-src', 'data', 'settings.json');
const destFile = join(
  rootDir,
  'resources',
  'bot-template',
  'data',
  'settings.json',
);

async function main() {
  try {
    console.log('[bot-template] copying settings.json...');

    await ensureDir(dirname(destFile));

    await copy(srcFile, destFile);

    console.log('[bot-template] settings.json copied successfully');
  } catch (err) {
    console.error('[bot-template] build failed:', err);
    process.exit(1);
  }
}

main();
