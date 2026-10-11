from pathlib import Path
import json
from PIL import Image

root = Path(__file__).resolve().parents[1]
dest = root / 'public' / 'images'
dest.mkdir(parents=True, exist_ok=True)
assets = [
    ('game-banners/iii-hero-banner.png', 'iii-banner.webp'),
    ('game-banners/vc-hero-banner-1.jpg', 'vc-banner.webp'),
    ('game-banners/sa-hero-banner-1.png', 'sa-banner.webp'),
    ('icons/iii-icon-square.png', 'iii-icon.png'),
    ('icons/vc-256x256.png', 'vc-icon.png'),
    ('icons/sa-256x256.png', 'sa-icon.png'),
]
for source, target in assets:
    image = Image.open(root / 'source-images' / source).convert('RGB')
    image.thumbnail((1920, 1920) if target.endswith('.webp') else (256, 256), Image.Resampling.LANCZOS)
    image.save(dest / target, quality=88, method=6) if target.endswith('.webp') else image.save(dest / target, optimize=True)
    print(target, (dest / target).stat().st_size)

readme = Path(r'G:\GTA\SilentSpeedPatch\SilentPatch\README.md').read_text(encoding='utf-8')
fixes = {}
for slug, start, end in [
    ('gta-iii', '## GTA3', '## GTAVC'),
    ('vice-city', '## GTAVC', '## GTASA'),
    ('san-andreas', '## GTASA', '## Thanks / Credits'),
]:
    section = readme.split(start, 1)[1].split(end, 1)[0]
    original, custom = section.split('Custom SpeedrunSilentPatch fixes not in original SilentPatch:', 1)
    def bullets(text):
        return [line.strip().removeprefix('- ') for line in text.splitlines() if line.strip() and (line.strip().startswith('- ') or line.strip().startswith('The game now write'))]
    fixes[slug] = {'original': bullets(original), 'custom': bullets(custom)}

crash = 'The game writes a crash log after an unhandled exception. An optional full-process memory dump can also be written beside the executable. Full dumps are disabled by default because they can be large.'
for slug in fixes:
    fixes[slug]['custom'] = [crash if 'crash log' in fix else fix for fix in fixes[slug]['custom']]
(root / 'src' / 'data' / 'fixes.json').write_text(json.dumps(fixes, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print({slug: {kind: len(items) for kind, items in data.items()} for slug, data in fixes.items()})

