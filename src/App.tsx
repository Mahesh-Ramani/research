import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PaperReader } from './components/PaperReader';
import { PapersSection } from './components/PapersSection';
import { Paper } from './types';
import { SITE } from './data/siteData';

export default function App() {
  const [paper, setPaper] = useState<Paper | null>(null);

  return (
    <div id="top" className="min-h-screen bg-[#fdfcfb] text-stone-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5 border-b border-stone-200 py-10 sm:py-14">
          <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Hello, I’m Mahesh.
          </h1>
          <p className="max-w-2xl font-serif text-lg leading-relaxed text-stone-700">{SITE.intro}</p>
        </div>
        <PapersSection onRead={setPaper} />
      </main>

      <footer className="border-t border-stone-200 bg-[#f6f3ef] py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-4 text-xs text-stone-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="font-serif text-base font-semibold text-stone-800">{SITE.name}</div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${SITE.email}`} className="hover:text-stone-950">{SITE.email}</a>
            <a
              href="https://www.linkedin.com/in/mahesh-ramani-3289162a2/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-950"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </footer>

      <PaperReader paper={paper} onClose={() => setPaper(null)} />
    </div>
  );
}
