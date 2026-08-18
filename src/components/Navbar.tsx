import { PageTab } from '../types';

interface Props {
  active: PageTab;
  onChange: (tab: PageTab) => void;
}

const tabs: Array<{ key: PageTab; label: string }> = [
  { key: 'home', label: 'Home' },
  { key: 'papers', label: 'Papers' },
  { key: 'explanations', label: 'Explanations' },
  { key: 'about', label: 'About' },
];

export function Navbar({ active, onChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#fdfcfb]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => onChange('home')} className="font-serif text-lg font-semibold tracking-tight">
          Mahesh Ramani
        </button>
        <nav className="flex items-center gap-1 sm:gap-5" aria-label="Primary navigation">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition sm:text-xs ${
                active === tab.key ? 'text-stone-950' : 'text-stone-500 hover:text-stone-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
