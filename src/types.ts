export type PageTab = 'home' | 'papers' | 'explanations' | 'about';

export type PaperArea = 'Hypergraphs' | 'Algebra & Boolean Lattices' | '3D Queen Graphs';

export interface Explanation {
  question?: string;
  context?: string;
  result?: string;
  idea?: string;
  technical?: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  dateLabel: string;
  area: PaperArea;
  tags: string[];
  abstract: string;
  pdfFile: string;
  previewFile: string;
  arxivId?: string;
  featured?: boolean;
  highlight?: string;
  explanation?: Explanation;
}
