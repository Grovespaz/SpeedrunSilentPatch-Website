import Link from 'next/link';
import { games, repository, type GameSlug } from '@/data/games';

export function Arrow({ down = false }: { down?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {down ? <path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
  </svg>;
}
export function Header({ current }: { current?: GameSlug }) {
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="wordmark" aria-label="SpeedrunSilentPatch home">Speedrun<span>SilentPatch</span></Link>
    <nav aria-label="Main navigation">
      {games.map(game => <Link key={game.slug} href={`/${game.slug}/`} className={`nav-game theme-${game.slug}`} aria-current={current === game.slug ? 'page' : undefined}>{game.shortName}</Link>)}
      <a className="source-link" href={repository}>GitHub <span aria-hidden="true">↗</span></a>
    </nav>
  </div></header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <p>Based on <a href="https://github.com/CookiePLMonster/SilentPatch">SilentPatch by Silent</a>.<br className="mobile-break" /> Adapted by Grovespaz, with fix curation by EnglishBen.</p>
  </div></footer>;
}
export function InlineText({ text }: { text: string }) {
  return <>{text.split(/(`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, i) => {
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    return link ? <a href={link[2]} key={i}>{link[1]}</a> : part;
  })}</>;
}
