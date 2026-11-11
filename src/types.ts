export type PaperArea = 'Hypergraphs' | 'Algebra & Boolean Lattices' | 'Noncommutative Algebra' | '3D Queen Graphs';

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
  highlight?: string;
}
