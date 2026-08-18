import { Mail } from 'lucide-react';
import { SITE } from '../data/siteData';

export function AboutPage() {
  return (
    <div className="pb-24 pt-8 sm:pt-12">
      <div className="grid gap-12 border-b border-stone-200 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">About</div>
          <h1 className="mt-3 font-serif text-5xl font-semibold tracking-tight">{SITE.name}</h1>
          <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-stone-700">{SITE.intro}</p>
        </div>
        <div className="lg:col-span-5 lg:border-l lg:border-stone-200 lg:pl-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Current interests</div>
          <ul className="mt-5 space-y-2 font-serif text-lg text-stone-800">
            <li>Extremal combinatorics</li>
            <li>Hypergraph theory</li>
            <li>Algebraic combinatorics</li>
            <li>Finite geometry</li>
            <li>Spectral graph theory</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Contact</div>
        <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-2 font-serif text-xl underline decoration-stone-300 underline-offset-4 hover:decoration-stone-950">
          <Mail className="h-4 w-4" /> {SITE.email}
        </a>
      </div>
    </div>
  );
}
