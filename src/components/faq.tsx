'use client';

import { useEffect } from 'react';
import { InlineText } from './site';
import type { Faq } from '@/data/games';

export function FaqList({ faqs, leaderboard, gameName }: { faqs: Faq[]; leaderboard: string; gameName: string }) {
  useEffect(() => {
    function openLinkedAnswer() {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target instanceof HTMLDetailsElement) target.open = true;
    }
    openLinkedAnswer();
    window.addEventListener('hashchange', openLinkedAnswer);
    return () => window.removeEventListener('hashchange', openLinkedAnswer);
  }, []);
  return <div className="faq-list">{faqs.map((faq, i) => <details key={faq.question} id={i === 1 ? 'ini-settings' : undefined} open={i === 0}>
    <summary>{faq.question}<span className="faq-indicator" aria-hidden="true" /></summary>
    <div className="faq-answer"><p><InlineText text={faq.answer} /></p>{i === 0 && <a className="text-link" href={leaderboard}>View {gameName} leaderboards & rules <span aria-hidden="true">↗</span></a>}</div>
  </details>)}</div>;
}

