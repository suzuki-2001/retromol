'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { COLOR_PALETTES, type PaletteKey } from './ProteinViewer';

interface PaletteSelectorProps {
  selected: PaletteKey;
  onSelect: (palette: PaletteKey) => void;
  compact?: boolean;
}

const paletteKeys = Object.keys(COLOR_PALETTES) as PaletteKey[];

const categories = {
  sequential: paletteKeys.filter(k => COLOR_PALETTES[k].category === 'sequential'),
  diverging: paletteKeys.filter(k => COLOR_PALETTES[k].category === 'diverging'),
  qualitative: paletteKeys.filter(k => COLOR_PALETTES[k].category === 'qualitative'),
};

function PaletteButton({
  paletteKey,
  selected,
  onSelect
}: {
  paletteKey: PaletteKey;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`group relative w-full aspect-[2/1] rounded overflow-hidden border-2 transition-all ${
        selected
          ? 'border-[var(--accent-primary)] scale-105'
          : 'border-transparent hover:border-[var(--text-muted)]'
      }`}
      title={COLOR_PALETTES[paletteKey].name}
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(to right, ${COLOR_PALETTES[paletteKey].colors.join(', ')})`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
        <span className="text-[7px] text-white font-medium">{COLOR_PALETTES[paletteKey].name}</span>
      </div>
    </button>
  );
}

export default function PaletteSelector({ selected, onSelect, compact = false }: PaletteSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = 220;
    const dropdownHeight = 280;

    let left = rect.left;
    let top = rect.bottom + 4;

    // Prevent overflow on right
    if (left + dropdownWidth > window.innerWidth - 10) {
      left = window.innerWidth - dropdownWidth - 10;
    }

    // Prevent overflow on left
    if (left < 10) {
      left = 10;
    }

    // If dropdown would go below viewport, show above
    if (top + dropdownHeight > window.innerHeight - 10) {
      top = rect.top - dropdownHeight - 4;
    }

    setPosition({ top, left });
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedPalette = COLOR_PALETTES[selected];

  const handleSelect = (key: PaletteKey) => {
    onSelect(key);
    setIsOpen(false);
  };

  const dropdown = isOpen && mounted ? createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-[9999] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-2xl py-2 animate-fade-in"
      style={{
        top: position.top,
        left: position.left,
        width: 220,
        maxHeight: 'calc(100vh - 20px)',
        overflowY: 'auto',
      }}
    >
      <div className="px-2 pb-1 mb-1 border-b border-[var(--border-color)]">
        <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Sequential</span>
      </div>
      <div className="grid grid-cols-5 gap-1 px-2 mb-2">
        {categories.sequential.map((key) => (
          <PaletteButton
            key={key}
            paletteKey={key}
            selected={selected === key}
            onSelect={() => handleSelect(key)}
          />
        ))}
      </div>

      <div className="px-2 pb-1 mb-1 border-b border-[var(--border-color)]">
        <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Diverging</span>
      </div>
      <div className="grid grid-cols-5 gap-1 px-2 mb-2">
        {categories.diverging.map((key) => (
          <PaletteButton
            key={key}
            paletteKey={key}
            selected={selected === key}
            onSelect={() => handleSelect(key)}
          />
        ))}
      </div>

      <div className="px-2 pb-1 mb-1 border-b border-[var(--border-color)]">
        <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Special</span>
      </div>
      <div className="grid grid-cols-5 gap-1 px-2">
        {categories.qualitative.map((key) => (
          <PaletteButton
            key={key}
            paletteKey={key}
            selected={selected === key}
            onSelect={() => handleSelect(key)}
          />
        ))}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-1.5 py-1 rounded-md transition-all ${
          isOpen
            ? 'bg-[var(--bg-hover)] ring-1 ring-[var(--accent-primary)]'
            : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)]'
        }`}
      >
        <div
          className="w-10 h-2.5 rounded-full shadow-inner"
          style={{
            background: `linear-gradient(to right, ${selectedPalette.colors.join(', ')})`,
          }}
        />
        <svg
          className={`w-2.5 h-2.5 text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {dropdown}
    </>
  );
}
