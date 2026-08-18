import { useMemo, useState } from 'react';
import { BookOpen, ExternalLink, Search } from 'lucide-react';
import { AREAS, PAPERS } from '../data/papersData';
import { Paper } from '../types';
import { MathRenderer } from '../components/MathRenderer';
import { PaperPreview } from '../components/PaperPreview';

interface Props {
  onRead: (paper: Paper) => void;
  onExplain: (paperId: string) => void;
}

export function PapersPage({ onRead, onExplain }: Props) {
  const [area, setArea] = useState<(typeof AREAS)[number]>('All');
  const [query, setQuery] = useState('');

  const papers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PAPERS.filter((paper) => {
      const areaMatch = area === 'All' || paper.area === area;
      const queryMatch =
        !q ||
        paper.title.toLowerCase().includes(q) ||
        paper.abstract.toLowerCase().includes(q) ||
        paper.tags.some((tag) => tag.toLowerCase().includes(q));
      return areaMatch && queryMatch;
    });
  }, [area, query]);

  return (
    <div className="pb-24 pt-8 sm:pt-12">
      <div className="border-b border-stone-200 pb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">Research archive · {PAPERS.length} manuscripts</div>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Papers & preprints</h1>
        <p className="mt-3 max-w-2xl font-serif text-base leading-relaxed text-stone-600">
          Each entry uses the attached manuscript itself as the source for its title and abstract. The reader opens the complete PDF inside the site.
        </p>

        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles, abstracts, or topics"
              className="w-full border border-stone-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-stone-950"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((item) => (
              <button
                key={item}
                onClick={() => setArea(item)}
                className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${
                  area === item ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300 bg-white text-stone-600 hover:border-stone-950'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-7">
        {papers.map((paper) => (
          <article key={paper.id} className="grid gap-6 border border-stone-200 bg-white p-5 sm:p-7 md:grid-cols-[170px_1fr] md:gap-8">
            <PaperPreview paper={paper} className="aspect-[0.707] w-full max-w-[190px] justify-self-center md:justify-self-start" />
            <div className="flex min-w-0 flex-col">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-stone-500">
                <span>{paper.area}</span>
                <span>·</span>
                <span>{paper.dateLabel}</span>
                {paper.arxivId && (
                  <>
                    <span>·</span>
                    <span>arXiv:{paper.arxivId}</span>
                  </>
                )}
              </div>
              <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight sm:text-3xl">{paper.title}</h2>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">{paper.authors.join(', ')}</div>

              {paper.highlight && (
                <div className="mt-4 border-l-2 border-stone-950 pl-4 text-sm font-medium leading-relaxed text-stone-800">{paper.highlight}</div>
              )}

              <div className="abstract-clamp mt-4 font-serif text-sm leading-relaxed text-stone-600">
                <MathRenderer content={paper.abstract} />
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-stone-200 pt-5">
                <button
                  onClick={() => onRead(paper)}
                  className="inline-flex items-center gap-2 bg-stone-950 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Read in site
                </button>
                <button
                  onClick={() => onExplain(paper.id)}
                  className="border border-stone-950 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-950"
                >
                  Explanation
                </button>
                {paper.arxivId && (
                  <a
                    href={`https://arxiv.org/abs/${paper.arxivId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 hover:text-stone-950"
                  >
                    arXiv <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
