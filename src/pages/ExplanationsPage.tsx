import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { PAPERS } from '../data/papersData';
import { Paper } from '../types';

interface Props {
  selectedId: string | null;
  onRead: (paper: Paper) => void;
}

export function ExplanationsPage({ selectedId, onRead }: Props) {
  const [activeId, setActiveId] = useState<string | null>(selectedId);

  useEffect(() => setActiveId(selectedId), [selectedId]);

  const paper = PAPERS.find((item) => item.id === activeId);

  if (paper) {
    const explanation = paper.explanation;
    const hasContent = explanation && Object.values(explanation).some(Boolean);

    return (
      <div className="pb-24 pt-8 sm:pt-12">
        <button onClick={() => setActiveId(null)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500 hover:text-stone-950">
          <ArrowLeft className="h-3.5 w-3.5" /> All explanations
        </button>
        <article className="mx-auto mt-8 max-w-3xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">Plain-English research note</div>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight">{paper.title}</h1>
          <button onClick={() => onRead(paper)} className="mt-5 inline-flex items-center gap-2 border border-stone-950 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em]">
            <BookOpen className="h-3.5 w-3.5" /> Read the paper
          </button>

          {!hasContent ? (
            <div className="mt-12 border-y border-stone-200 py-12">
              <h2 className="font-serif text-2xl font-semibold">Explanation coming soon.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-600">
                I’m keeping the accessible explanation separate from the technical manuscript so it can be written carefully rather than auto-generated from the abstract.
              </p>
            </div>
          ) : (
            <div className="mt-10 space-y-10">
              <ExplanationSection title="What is the question?" body={explanation?.question} />
              <ExplanationSection title="Why is it interesting?" body={explanation?.context} />
              <ExplanationSection title="What did I prove?" body={explanation?.result} />
              <ExplanationSection title="Main idea" body={explanation?.idea} />
              <ExplanationSection title="More technical" body={explanation?.technical} />
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-8 sm:pt-12">
      <div className="max-w-3xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">Research, explained</div>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Plain-English explanations</h1>
      </div>

      <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
        {PAPERS.map((item, index) => (
          <button key={item.id} onClick={() => setActiveId(item.id)} className="grid w-full gap-3 py-6 text-left sm:grid-cols-[54px_1fr_auto] sm:items-center">
            <span className="font-mono text-[10px] text-stone-400">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <div className="font-serif text-xl font-semibold leading-snug">{item.title}</div>
              <div className="mt-1 text-xs text-stone-500">{item.area}</div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500">Open note</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExplanationSection({ title, body }: { title: string; body?: string }) {
  if (!body) return null;
  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <p className="mt-3 font-serif text-base leading-relaxed text-stone-700">{body}</p>
    </section>
  );
}
