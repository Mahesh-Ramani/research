import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PaperReader } from './components/PaperReader';
import { AboutPage } from './pages/AboutPage';
import { ExplanationsPage } from './pages/ExplanationsPage';
import { HomePage } from './pages/HomePage';
import { PapersPage } from './pages/PapersPage';
import { PageTab, Paper } from './types';
import { SITE } from './data/siteData';

export default function App() {
  const [tab, setTab] = useState<PageTab>('home');
  const [paper, setPaper] = useState<Paper | null>(null);
  const [explanationId, setExplanationId] = useState<string | null>(null);

  const changeTab = (next: PageTab) => {
    setTab(next);
    if (next !== 'explanations') setExplanationId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openExplanation = (paperId: string) => {
    setExplanationId(paperId);
    setTab('explanations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-stone-950">
      <Navbar active={tab} onChange={changeTab} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {tab === 'home' && <HomePage setTab={changeTab} onRead={setPaper} />}
        {tab === 'papers' && <PapersPage onRead={setPaper} onExplain={openExplanation} />}
        {tab === 'explanations' && <ExplanationsPage selectedId={explanationId} onRead={setPaper} />}
        {tab === 'about' && <AboutPage />}
      </main>

      <footer className="border-t border-stone-200 bg-[#f6f3ef] py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-4 text-xs text-stone-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="font-serif text-base font-semibold text-stone-800">{SITE.name}</div>
          <a href={`mailto:${SITE.email}`} className="hover:text-stone-950">{SITE.email}</a>
        </div>
      </footer>

      <PaperReader paper={paper} onClose={() => setPaper(null)} />
    </div>
  );
}
