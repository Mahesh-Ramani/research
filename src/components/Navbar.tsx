import { SITE } from '../data/siteData';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#fdfcfb]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight">
          {SITE.name}
        </a>
        <nav aria-label="Primary navigation">
          <a
            href="#papers"
            className="inline-block px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600 transition hover:text-stone-950"
          >
            Papers
          </a>
        </nav>
      </div>
    </header>
  );
}
