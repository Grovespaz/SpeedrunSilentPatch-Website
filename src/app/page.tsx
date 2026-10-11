import Link from 'next/link';
import { games, repository } from '@/data/games';
import { Header, Footer, Arrow } from '@/components/site';

export default function Home() {
  return <><Header /><main id="main" className="container home-main">
    <section className="home-intro" aria-labelledby="home-title">
      <h1 id="home-title">SpeedrunSilentPatch</h1>
      <p className="home-lead">SilentPatch, but for speedrunning.</p>
      <p className="intro-copy">Compatibility fixes and quality-of-life improvements for the original PC trilogy, selected to keep the games playable on modern hardware without giving runners a speed advantage.</p>
    </section>
    <section aria-labelledby="choose-game">
      <h2 id="choose-game" className="choose-heading">Choose your game</h2>
      <div className="game-grid">
        {games.map(game => <Link key={game.slug} href={`/${game.slug}/`} className={`game-card theme-${game.slug}`}>
          <div className="card-art" style={{ backgroundImage: `url(${game.banner})` }} />
          <div className="card-body">
            <div className="card-title"><img src={game.icon} width="64" height="64" alt="" /><div><h3>{game.shortName}</h3><p>{game.version}</p></div></div>
            <div className="card-action">Download & installation <Arrow /></div>
          </div>
        </Link>)}
      </div>
    </section>
    <section className="home-about" aria-label="About the patch">
      <div><h2>Why a separate patch?</h2><p>The original SilentPatch fixes many issues across the trilogy. Some of those fixes also make runs faster. SSP keeps a curated set of fixes and adds tools for runners, so using it stays optional.</p><p>Runs using SSP are eligible for the leaderboards. Each game page covers compatibility, installation and settings.</p><p className="project-link">Found a patch issue? <a href={`${repository}/issues`}>Report it on GitHub.</a></p></div>
      <div><h2>Playing casually?</h2><p>For a regular playthrough, use the original SilentPatch for its broader range of fixes.</p><a className="text-link" href="https://cookieplmonster.github.io/mods/gta/">Get the original SilentPatch <span aria-hidden="true">↗</span></a></div>
    </section>
  </main><Footer /></>;
}

