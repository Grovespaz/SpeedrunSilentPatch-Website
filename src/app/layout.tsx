import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'SpeedrunSilentPatch - GTA patches for speedrunners', template: '%s | SpeedrunSilentPatch' },
  description: 'Download SpeedrunSilentPatch for GTA III, Vice City and San Andreas. Compatibility fixes and quality-of-life improvements selected for speedrunning.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}

