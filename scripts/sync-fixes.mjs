import { readFile, writeFile } from 'node:fs/promises';

const readmePath = process.argv[2] ?? String.raw`G:\GTA\SilentSpeedPatch\SilentPatch\README.md`;
const readme = await readFile(readmePath, 'utf8');
const customHeading = 'Custom SpeedrunSilentPatch fixes not in original SilentPatch:';
const crash = 'The game writes a crash log after an unhandled exception. An optional full-process memory dump can also be written beside the executable. Full dumps are disabled by default because they can be large.';
const fixes = {};

function bullets(text) {
  return text.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('- ') || line.startsWith('The game now write'))
    .map(line => line.startsWith('- ') ? line.slice(2) : line);
}

for (const [slug, start, end] of [
  ['gta-iii', '## GTA3', '## GTAVC'],
  ['vice-city', '## GTAVC', '## GTASA'],
  ['san-andreas', '## GTASA', '## Thanks / Credits'],
]) {
  const startIndex = readme.indexOf(start);
  const endIndex = readme.indexOf(end, startIndex + start.length);
  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Missing README section ${start} or ${end}. Existing fixes data was preserved.`);
  }

  const section = readme.slice(startIndex + start.length, endIndex);
  const customIndex = section.indexOf(customHeading);
  if (customIndex === -1) {
    throw new Error(`Missing custom fixes heading for ${slug}. Existing fixes data was preserved.`);
  }

  fixes[slug] = {
    original: bullets(section.slice(0, customIndex)),
    custom: bullets(section.slice(customIndex + customHeading.length))
      .map(fix => fix.includes('crash log') ? crash : fix),
  };
}

await writeFile(new URL('../src/data/fixes.json', import.meta.url), JSON.stringify(fixes, null, 2) + '\n');
console.log(Object.fromEntries(Object.entries(fixes).map(([slug, data]) => [
  slug,
  Object.fromEntries(Object.entries(data).map(([kind, items]) => [kind, items.length])),
])));
