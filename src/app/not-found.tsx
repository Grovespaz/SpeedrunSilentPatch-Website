import Link from 'next/link';
import { Header, Footer } from '@/components/site';
export default function NotFound() {
  return <><Header /><main id="main" className="container not-found"><h1>Page not found</h1><p>Choose a game from the home page to find its patch.</p><Link className="text-link" href="/">Back to home →</Link></main><Footer /></>;
}

