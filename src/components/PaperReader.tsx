import { ExternalLink, X } from 'lucide-react';
import { Paper } from '../types';
import { assetUrl } from './PaperPreview';

interface Props {
  paper: Paper | null;
  onClose: () => void;
}

export function PaperReader({ paper, onClose }: Props) {
  if (!paper) return null;

  const pdfUrl = assetUrl(paper.pdfFile);
  const arxivUrl = paper.arxivId ? `https://arxiv.org/abs/${paper.arxivId}` : undefined;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="mx-auto flex h-full max-w-[1500px] flex-col overflow-hidden bg-[#f7f5f2] shadow-2xl sm:border sm:border-stone-300">
        <div className="flex items-start justify-between gap-4 border-b border-stone-300 bg-white px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">
              In-site PDF reader
            </div>
            <h2 className="truncate font-serif text-base font-semibold sm:text-xl">{paper.title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {arxivUrl && (
              <a
                href={arxivUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden border border-stone-300 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-700 hover:border-stone-950 sm:inline-flex"
              >
                arXiv
              </a>
            )}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-stone-950 bg-stone-950 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-black"
            >
              Open PDF <ExternalLink className="h-3 w-3" />
            </a>
            <button onClick={onClose} className="p-2 text-stone-500 hover:text-stone-950" aria-label="Close paper reader">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-stone-200">
          <iframe
            title={paper.title}
            src={`${pdfUrl}#view=FitH`}
            className="h-full w-full border-0"
          />
        </div>

        <div className="border-t border-stone-300 bg-white px-4 py-2 text-center text-[10px] text-stone-500 sm:hidden">
          If your mobile browser does not embed PDFs, use “Open PDF”.
        </div>
      </div>
    </div>
  );
}
