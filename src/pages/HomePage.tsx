import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { PAPERS } from '../data/papersData';
import { SITE } from '../data/siteData';
import { PageTab, Paper } from '../types';
import { PaperPreview } from '../components/PaperPreview';

interface Props {
  setTab: (tab: PageTab) => void;
  onRead: (paper: Paper) => void;
}

export function HomePage({ setTab, onRead }: Props) {
  const featured = useMemo(() => PAPERS.filter((paper) => paper.featured), []);
  const [selected, setSelected] = useState(featured[0]);

  return (
    <div className="space-y-20 pb-24 pt-8 sm:pt-12">
      <section className="grid gap-10 border-b border-stone-200 pb-16 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-8 lg:col-span-7">
          <div className="space-y-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">{SITE.role} · Mathematics</div>
            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-stone-950 sm:text-6xl">
              Combinatorics, geometry, and algebra.
            </h1>
            <p className="max-w-2xl font-serif text-lg leading-relaxed text-stone-700">{SITE.intro}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button onClick={() => setTab('papers')} className="bg-stone-950 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                Browse papers
              </button>
              <button onClick={() => setTab('explanations')} className="border border-stone-950 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-950">
                Read explanations
              </button>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-7">
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Selected work</div>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {featured.map((paper) => (
                <button
                  key={paper.id}
                  onClick={() => setSelected(paper)}
                  className={`w-full py-4 text-left transition ${selected.id === paper.id ? 'text-stone-950' : 'text-stone-500 hover:text-stone-950'}`}
                >
                  <div className="font-serif text-lg font-semibold leading-snug">{paper.title}</div>
                  {paper.highlight && <div className="mt-1 text-sm leading-relaxed text-stone-600">{paper.highlight}</div>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-stone-200 bg-[#f4f1ed] p-5 sm:p-7">
            <PaperPreview paper={selected} className="mx-auto aspect-[0.707] max-w-sm" />
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-stone-500">Featured manuscript</div>
                <div className="mt-1 font-serif text-lg font-semibold leading-snug">{selected.title}</div>
              </div>
              <button onClick={() => onRead(selected)} className="shrink-0 border border-stone-950 bg-white p-3 text-stone-950 hover:bg-stone-950 hover:text-white" aria-label={`Read ${selected.title}`}>
                <BookOpen className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Research directions</div>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">Three connected lines of work</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <ResearchDirection
            index="01"
            title="Extremal hypergraphs & finite geometry"
            text="Incidence-rank methods, generalized crowns, finite nets, affine and projective planes, maximal arcs, and stability. Includes a solution to the Adak–Verma conjecture."
            onClick={() => setTab('papers')}
          />
          <ResearchDirection
            index="02"
            title="Boolean lattices & pseudo-roots"
            text="Diamond generation in Boolean lattices, cographs, and obstructions to rational recovery in noncommutative settings."
            onClick={() => setTab('papers')}
          />
          <ResearchDirection
            index="03"
            title="Three-dimensional queen graphs"
            text="Domination on finite 3D boards and spectral structure for the toroidal analogue, using exact computation and finite Fourier analysis."
            onClick={() => setTab('papers')}
          />
        </div>
      </section>
    </div>
  );
}

function ResearchDirection({ index, title, text, onClick }: { index: string; title: string; text: string; onClick: () => void }) {
  return (
    <article className="flex min-h-64 flex-col justify-between border border-stone-200 bg-white p-7">
      <div>
        <div className="font-mono text-[10px] text-stone-400">{index}</div>
        <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-stone-600">{text}</p>
      </div>
      <button onClick={onClick} className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-700">
        View papers <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}
