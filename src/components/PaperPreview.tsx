import { Paper } from '../types';

export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function PaperPreview({ paper, className = '' }: { paper: Paper; className?: string }) {
  return (
    <div className={`overflow-hidden border border-stone-200 bg-white shadow-sm ${className}`}>
      <img
        src={assetUrl(paper.previewFile)}
        alt={`First page of ${paper.title}`}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
