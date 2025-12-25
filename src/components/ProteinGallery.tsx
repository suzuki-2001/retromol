'use client';

import ProteinCard from './ProteinCard';

interface Protein {
  name: string;
  pdbId: string;
  description: string;
  category: 'enzyme' | 'structural' | 'binding' | 'transport';
  residueCount?: number;
}

interface ProteinGalleryProps {
  proteins: Protein[];
}

export default function ProteinGallery({ proteins }: ProteinGalleryProps) {
  return (
    <div className="w-full">
      {/* Hint */}
      <p className="text-center text-[var(--text-muted)] text-xs mb-8">
        Click to pause rotation / Hover for gold highlights
      </p>

      {/* Responsive grid - compact gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 stagger-fade-in">
        {proteins.map((protein, index) => (
          <ProteinCard
            key={protein.pdbId}
            name={protein.name}
            pdbId={protein.pdbId}
            description={protein.description}
            residueCount={protein.residueCount}
            category={protein.category}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
