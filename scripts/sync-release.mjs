import { writeFile } from 'node:fs/promises';
const response = await fetch('https://api.github.com/repos/Grovespaz/SpeedrunSilentPatch/releases/latest', {
  headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'SpeedrunSilentPatch-website' },
  signal: AbortSignal.timeout(15000),
});
if (!response.ok) throw new Error(`GitHub returned ${response.status}. Existing release data was preserved.`);
const release = await response.json();
const downloads = {};
for (const [slug, code] of [['gta-iii', 'III'], ['vice-city', 'VC'], ['san-andreas', 'SA']]) {
  const matches = release.assets.filter(asset => new RegExp(`^SpeedrunSilentPatch-${code}-.+\\.zip$`, 'i').test(asset.name));
  if (matches.length !== 1) throw new Error(`Expected exactly one ${code} ZIP; found ${matches.length}. Existing release data was preserved.`);
  downloads[slug] = matches[0].browser_download_url;
}
const data = {
  name: release.tag_name.replace('SSP-Build-', 'Build '),
  date: release.published_at.slice(0, 10),
  url: release.html_url,
  downloads,
};
await writeFile(new URL('../src/data/release.json', import.meta.url), JSON.stringify(data, null, 2) + '\n');
console.log(`Updated download links to ${data.name}.`);

