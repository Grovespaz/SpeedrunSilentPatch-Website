import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const destination = new URL('../public/images/', import.meta.url);
await mkdir(destination, { recursive: true });

const assets = [
  ['game-banners/iii-hero-banner.png', 'iii-banner.webp'],
  ['game-banners/vc-hero-banner-1.jpg', 'vc-banner.webp'],
  ['game-banners/sa-hero-banner-1.png', 'sa-banner.webp'],
  ['icons/iii-icon-square.png', 'iii-icon.png'],
  ['icons/vc-256x256.png', 'vc-icon.png'],
  ['icons/sa-256x256.png', 'sa-icon.png'],
];

for (const [source, target] of assets) {
  const isBanner = target.endsWith('.webp');
  const size = isBanner ? 1920 : 256;
  const image = sharp(fileURLToPath(new URL(`../source-images/${source}`, import.meta.url)))
    .toColourspace('srgb')
    .removeAlpha()
    .resize(size, size, { fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' });

  if (isBanner) image.webp({ quality: 88, effort: 6 });
  else image.png({ compressionLevel: 9 });

  const info = await image.toFile(fileURLToPath(new URL(target, destination)));
  console.log(`${target} ${info.size}`);
}
