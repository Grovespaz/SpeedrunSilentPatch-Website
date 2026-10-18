import fixes from './fixes.json';

export type GameSlug = 'gta-iii' | 'vice-city' | 'san-andreas';
export type Faq = { question: string; answer: string };
export type Game = {
  slug: GameSlug;
  code: string;
  name: string;
  shortName: string;
  version: string;
  compatibility: string;
  executable: string;
  saveFolder: string;
  icon: string;
  banner: string;
  leaderboard: string;
  faqs: Faq[];
};
export const repository = 'https://github.com/Grovespaz/SpeedrunSilentPatch';
export const games: Game[] = [
  {
    slug: 'gta-iii', code: 'III', name: 'Grand Theft Auto III', shortName: 'GTA III',
    version: 'PC 1.0 & 1.1',
    compatibility: 'Supports the original PC versions 1.0 and 1.1 (Retail and Steam). Rockstar Games Launcher executables are not supported; use a regular 1.1 executable instead.',
    executable: 'gta3.exe', icon: '/images/iii-icon.png', banner: '/images/iii-banner.webp',
    saveFolder: 'GTA3 User Files',
    leaderboard: 'https://www.speedrun.com/gtaiii', faqs: [],
  },
  {
    slug: 'vice-city', code: 'VC', name: 'Grand Theft Auto: Vice City', shortName: 'Vice City',
    version: 'PC Japanese version',
    compatibility: 'The Japanese PC version is the tested and supported version. Versions 1.0 and 1.1 work, but have not been extensively tested.',
    executable: 'gta-vc.exe', icon: '/images/vc-icon.png', banner: '/images/vc-banner.webp',
    saveFolder: 'GTA Vice City User Files',
    leaderboard: 'https://www.speedrun.com/gtavc',
    faqs: [
      { question: 'Can I skip the intro videos?', answer: 'Yes. See the `SkipIntroSplashes` setting in the INI, or `/SkipIntroSplashes` for a single launch with the DDraw component. Keep it disabled for runs that start or restart the game while the timer is running, including 100% and trilogy runs. The option is off by default.' },
    ],
  },
  {
    slug: 'san-andreas', code: 'SA', name: 'Grand Theft Auto: San Andreas', shortName: 'San Andreas',
    version: 'PC 1.0 only',
    compatibility: 'Supports the original PC version 1.0 only. Other executables, including 1.01, Steam and Rockstar Games Launcher versions, are not supported.',
    executable: 'gta_sa.exe', icon: '/images/sa-icon.png', banner: '/images/sa-banner.webp',
    saveFolder: 'GTA San Andreas User Files',
    leaderboard: 'https://www.speedrun.com/gtasa',
    faqs: [
      { question: 'Why do I have to hold Shift to enter cheats?', answer: 'SSP prevents accidental cheats from normal movement inputs. By default, cheats only work while Shift is held. You can change `EnableCheats` to `Normal`, `Off`, `Shift`, `CapsLock` or `ScrollLock` in the INI.' },
      { question: 'Do I still need to pin the game to one CPU core?', answer: 'No. SSP fixes the streaming deadlock that could hang the game when entering or leaving interiors. `CpuAffinityMask` is still available, but affinity forcing is disabled by default.' },
      { question: 'If you only support 1.0, is the homie recruiting bug still there?', answer: 'No. SSP fixes all issues that the 1.01 patch also fixed.' },
      { question: 'Does the game still run at 25 FPS?', answer: 'Yes. Changing this would mean an unfair advantage over vanilla runners.' },
    ],
  },
];

export function getFixes(game: Game) { return fixes[game.slug]; }
export function getFaqs(game: Game): Faq[] {
  const ini = `SpeedrunSilentPatch${game.code}.ini`;
  const common: Faq[] = [
    {
      question: 'Are runs with SpeedrunSilentPatch allowed on the leaderboard?',
      answer: 'Yes. Runs using SpeedrunSilentPatch are legal and eligible for the leaderboard. SSP includes fixes selected for speedrunning and is optional to use. Follow the rules for your category when configuring optional settings.' + (game.code === 'VC' ? ' In particular, leave intro skipping disabled if you start or restart the game during the timed portion of a run.' : ''),
    },
    {
      question: 'Why aren’t my INI changes working?',
      answer: `If the game is installed in Program Files, Windows may block or redirect writes to the INI. Copy the whole game folder to a location outside Program Files, such as C:\\Games, and edit \`${ini}\` in that copy. Make sure it stays beside the ASI file, save your changes, and restart the game. Also check that you are launching the copy you edited.`,
    },
    {
      question: 'Can I use a custom resolution in windowed mode?',
      answer: 'Not currently. SSP’s windowed mode uses the game’s supported resolutions. Unlike dxwnd, it does not add custom resolutions, because they could give an unintended advantage over runners who do not use the patch.',
    },
    {
      question: 'Does SSP unlock VSync in the menus?',
      answer: 'No. Unlike dxwnd, SSP does not unlock VSync in menus. This could give an unintended speed advantage over runners who do not use the patch.',
    },
    {
      question: 'How do I enable windowed or borderless mode?',
      answer: `Open \`${ini}\` in a text editor. Under \`[SilentPatch]\`, set \`WindowedMode=Framed\` for a bordered window, \`WindowedMode=Borderless\` for borderless, or \`WindowedMode=Off\` for fullscreen. Save the file and restart the game. Press Alt+F while in windowed mode to switch between framed and borderless so you can reposition the window. You can also edit \`Documents\\${game.saveFolder}\\SpeedrunSilentPatch${game.code}.WindowedMode.ini\` to adjust positioning to the pixel level.`,
    },
    {
      question: 'Is this the same as the original SilentPatch?',
      answer: 'SSP is a fork of SilentPatch with a curated set of compatibility and quality-of-life fixes for speedrunners, plus SSP-specific additions. The original SilentPatch includes a broader range of fixes and is the better choice for casual play.',
    },
    {
      question: 'Does it work with the Definitive Edition?',
      answer: 'No. SpeedrunSilentPatch is for the original PC games. Check the supported executable version listed beside the download before installing.',
    },
    {
      question: 'I see some NG+ fixes, do I still have to reset my game in between runs?',
      answer: 'Yes. We’re not sure we’ve fixed all problematic instances of NG+ behavior, so a complete game restart is still required.',
    },
  ];
  if (game.code !== 'III') common.push({
    question: 'Can I replace music that may trigger copyright claims?',
    answer: `Yes. Set \`ReplaceDMCAMusic=1\` in \`${ini}\` to replace certain copyrighted ambience tracks${game.code === 'VC' ? ' and remove music from the Publicity Tour cutscene' : ', including music in certain minigames'}. This is disabled by default. It does not replace all of the game’s music or guarantee that a recording will avoid copyright claims.`,
  });
  return [...common, ...game.faqs];
}

