'use client';

import { useState, useMemo } from 'react';
import ProteinCard from './ProteinCard';

type Category = 'enzyme' | 'structural' | 'binding' | 'transport';

interface Protein {
  name: string;
  pdbId: string;
  description: string;
  category: Category;
  residueCount?: number;
}

interface ProteinGalleryProps {
  proteins: Protein[];
}

const CATEGORY_INFO: Record<Category | 'all', { label: string; icon: string; color: string }> = {
  all: { label: 'All', icon: '***', color: 'var(--accent-primary)' },
  enzyme: { label: 'Enzyme', icon: 'ENZ', color: '#10b981' },
  transport: { label: 'Transport', icon: 'TRP', color: '#f59e0b' },
  binding: { label: 'Binding', icon: 'BND', color: '#8b5cf6' },
  structural: { label: 'Structural', icon: 'STR', color: '#ec4899' },
};

const ITEMS_PER_PAGE = 20;

export default function ProteinGallery({ proteins }: ProteinGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Filter proteins by category
  const filteredProteins = useMemo(() => {
    if (activeCategory === 'all') return proteins;
    return proteins.filter(p => p.category === activeCategory);
  }, [proteins, activeCategory]);

  // Get visible proteins
  const visibleProteins = useMemo(() => {
    return filteredProteins.slice(0, displayCount);
  }, [filteredProteins, displayCount]);

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: proteins.length };
    proteins.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [proteins]);

  // Reset display count when category changes
  const handleCategoryChange = (category: Category | 'all') => {
    setActiveCategory(category);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  };

  const hasMore = displayCount < filteredProteins.length;

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {(Object.keys(CATEGORY_INFO) as (Category | 'all')[]).map(cat => {
          const info = CATEGORY_INFO[cat];
          const count = categoryCounts[cat] || 0;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`
                px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200
                flex items-center gap-2
                ${isActive
                  ? 'bg-[var(--bg-elevated)] border-2 shadow-lg'
                  : 'bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)]'
                }
              `}
              style={{
                borderColor: isActive ? info.color : undefined,
                boxShadow: isActive ? `0 0 12px ${info.color}40` : undefined,
              }}
            >
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: isActive ? info.color : `${info.color}30`,
                  color: isActive ? '#fff' : info.color,
                }}
              >
                {info.icon}
              </span>
              <span className={isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                {info.label}
              </span>
              <span className="text-[var(--text-muted)] text-[10px]">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-center text-[var(--text-muted)] text-xs mb-6">
        Click to pause rotation / Hover for gold highlights
      </p>

      {/* Responsive grid - compact gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 stagger-fade-in">
        {visibleProteins.map((protein, index) => (
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

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="
              px-6 py-3 rounded-lg font-mono text-sm
              bg-[var(--bg-secondary)] border border-[var(--border-color)]
              hover:border-[var(--accent-primary)] hover:bg-[var(--bg-hover)]
              transition-all duration-200
              flex items-center gap-2
              group
            "
          >
            <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
              Load More
            </span>
            <span className="text-[var(--text-muted)] text-xs">
              ({filteredProteins.length - displayCount} remaining)
            </span>
            <svg
              className="w-4 h-4 text-[var(--accent-primary)] group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="text-center mt-6 text-[var(--text-muted)] text-xs">
        Showing {visibleProteins.length} of {filteredProteins.length} proteins
        {activeCategory !== 'all' && ` in ${CATEGORY_INFO[activeCategory].label}`}
      </div>
    </div>
  );
}
