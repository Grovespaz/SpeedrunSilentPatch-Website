import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { games, getFaqs, getFixes } from '@/data/games';
import release from '@/data/release.json';
import { FaqList } from '@/components/faq';
import { Header, Footer, Arrow, InlineText } from '@/components/site';

export function generateStaticParams() { return games.map(game => ({ game: game.slug })); }
export const dynamicParams = false;
type Props = { params: Promise<{ game: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug } = await params;
  const game = games.find(game => game.slug === slug);
  return { title: game ? `${game.shortName} - Download & installation` : 'Game not found' };
}
export default async function GamePage({ params }: Props) {
  const { game: slug } = await params;
  const game = games.find(game => game.slug === slug);
  if (!game) notFound();
  const fixes = getFixes(game);
  const ini = `SpeedrunSilentPatch${game.code}.ini`;
  const asi = `SpeedrunSilentPatch${game.code}.asi`;
  return <div className={`theme-${game.slug} game-page`}>
    <Header current={game.slug} />
    <main id="main">
      <div className="container">
        <section className="game-hero" style={{ backgroundImage: `url(${game.banner})` }} aria-labelledby="game-title">
          <div className="hero-text"><p>SpeedrunSilentPatch for</p><h1 id="game-title">{game.shortName === 'GTA III' ? 'GTA III' : <><span className="hero-gta">Grand Theft Auto</span>{game.shortName}</>}</h1></div>
        </section>
        <nav className="section-nav" aria-label="On this page"><a href="#download">Download</a><a href="#installation">Installation</a><a href="#fixes">Included fixes</a><a href="#faq">FAQ</a><a href={game.leaderboard} className="leaderboard-link">Leaderboards <span aria-hidden="true">↗</span></a></nav>
        <div className="game-content">
          <aside id="download" className="download-panel">
            <h2>Download</h2>
            <div className="release-meta"><strong>{release.name}</strong><span>{new Date(release.date + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</span></div>
            <a className="download-button" href={release.downloads[game.slug]}><Arrow down /> Download for {game.shortName}</a>
            <a className="release-link" href={release.url}>Release notes & older builds <span aria-hidden="true">↗</span></a>
            <div className="compatibility"><h3>Supported versions</h3><p>{game.compatibility}</p></div>
          </aside>
          <div className="game-sections">
            <section id="installation" className="installation">
              <h2>Installation</h2>
              <ol className="steps">
                <li><h3>Download and extract the ZIP</h3><p>Extract all archive contents into your game folder, beside <code>{game.executable}</code>.</p>{game.code === 'SA' && <p>Overwrite <code>vorbisFile.dll</code> when prompted. Keep <code>vorbisHooked.dll</code> in the same folder.</p>}</li>
                <li><h3>Check the files</h3><p><code>{asi}</code> and <code>{ini}</code> should be directly in the main game folder, without an extra subfolder.</p></li>
                <li><h3>Set your preferences and play</h3><p>Optionally edit <code>{ini}</code> in a text editor for windowed mode{game.code !== 'III' ? ', music replacement' : ''} and other settings. Save the file, then start the game.</p></li>
              </ol>
              <p className="installation-tip">Settings won’t save? <a href="#ini-settings">See the INI troubleshooting answer below.</a></p>
            </section>
            <section id="fixes" className="fixes-section">
              <h2>Included fixes</h2>
              <p className="section-intro">The fixes included in SSP for {game.shortName}.</p>
              <h3>From SilentPatch</h3>
              <ul className="fix-list">{fixes.original.map((fix, i) => <li key={i}><InlineText text={fix} /></li>)}</ul>
              <h3 className="ssp-fixes-heading">Added in SpeedrunSilentPatch</h3>
              <ul className="fix-list">{fixes.custom.map((fix, i) => <li key={i}><InlineText text={fix} /></li>)}</ul>
            </section>
            <section id="faq" className="faq-section">
              <h2>Frequently asked questions</h2>
              <FaqList faqs={getFaqs(game)} leaderboard={game.leaderboard} gameName={game.shortName} />
            </section>
          </div>
        </div>
      </div>
    </main><Footer />
  </div>;
}

