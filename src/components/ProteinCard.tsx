'use client';

import { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { type PaletteKey, type DisplayStyle, type ExportFunctions, DISPLAY_STYLES } from './ProteinViewer';
import PaletteSelector from './PaletteSelector';

const ProteinViewer = dynamic(() => import('./ProteinViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--bg-primary)]">
      <span className="text-[var(--accent-primary)] text-xs animate-pulse-subtle">Loading...</span>
    </div>
  ),
});

interface ProteinCardProps {
  name: string;
  pdbId: string;
  description: string;
  residueCount?: number;
  category?: 'enzyme' | 'structural' | 'binding' | 'transport';
  index?: number;
}

const SEQUENTIAL_PALETTES: PaletteKey[] = ['blues', 'greens', 'oranges', 'purples', 'reds'];

const CATEGORY_LABELS: Record<string, string> = {
  enzyme: 'ENZ',
  structural: 'STR',
  binding: 'BND',
  transport: 'TRP',
};

// Style icons for display modes
function StyleIcon({ type }: { type: DisplayStyle }) {
  const iconClass = "w-3 h-3";
  switch (type) {
    case 'cartoon':
      // Ribbon/helix icon
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12c2-3 4-6 5-6s3 3 5 6" strokeLinecap="round" />
          <path d="M3 8c2-3 4-6 5-6s3 3 5 6" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case 'stick':
      // Stick/bond icon
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="4" cy="4" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <line x1="5" y1="5" x2="11" y2="11" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" opacity="0.5" />
          <line x1="11" y1="5" x2="5" y2="11" opacity="0.5" />
        </svg>
      );
    case 'sphere':
      // Sphere/spacefill icon
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="5" opacity="0.8" />
          <circle cx="4" cy="6" r="2.5" opacity="0.5" />
          <circle cx="11" cy="11" r="2" opacity="0.4" />
        </svg>
      );
    case 'surface':
      // Surface/blob icon
      return (
        <svg className={iconClass} viewBox="0 0 16 16" fill="currentColor" opacity="0.7">
          <path d="M8 2C4.5 2 2 5 2 8s2 5.5 6 6c4 .5 6-2.5 6-6S11.5 2 8 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ProteinCard({ name, pdbId, description, residueCount, category, index = 0 }: ProteinCardProps) {
  const defaultPalette = SEQUENTIAL_PALETTES[index % SEQUENTIAL_PALETTES.length];
  const [isHovered, setIsHovered] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState<PaletteKey>(defaultPalette);
  const [displayStyle, setDisplayStyle] = useState<DisplayStyle>('cartoon');
  const [isExportingGif, setIsExportingGif] = useState(false);
  const exportFnsRef = useRef<ExportFunctions | null>(null);

  const handleExportReady = useCallback((exportFns: ExportFunctions) => {
    exportFnsRef.current = exportFns;
  }, []);

  const handleDownload = useCallback(async () => {
    // Use the export function to get transparent canvas
    if (exportFnsRef.current) {
      const exportCanvas = exportFnsRef.current.getStaticPng();
      if (exportCanvas) {
        const link = document.createElement('a');
        link.download = `${pdbId.toLowerCase()}_${selectedPalette}.png`;
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
        return;
      }
    }
    // Fallback to display canvas
    const canvas = document.querySelector(`#viewer-${pdbId} canvas`) as HTMLCanvasElement;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${pdbId.toLowerCase()}_${selectedPalette}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [pdbId, selectedPalette]);

  const handleDownloadGif = useCallback(async () => {
    if (!exportFnsRef.current) return;

    setIsExportingGif(true);

    try {
      // Dynamically import gif.js
      const GIF = (await import('gif.js')).default;

      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: 256,
        height: 256,
        workerScript: '/gif.worker.js',
        transparent: 0x000000,
      });

      const viewer = exportFnsRef.current.getViewer();
      if (!viewer) {
        setIsExportingGif(false);
        return;
      }

      // Capture 36 frames (10 degrees per frame = full rotation)
      const frames = 36;
      for (let i = 0; i < frames; i++) {
        viewer.rotate(10, 'y');
        viewer.render();

        // Small delay for rendering
        await new Promise(resolve => setTimeout(resolve, 50));

        const frameCanvas = exportFnsRef.current.captureGifFrame();
        if (frameCanvas) {
          // Scale down for GIF
          const scaledCanvas = document.createElement('canvas');
          scaledCanvas.width = 256;
          scaledCanvas.height = 256;
          const ctx = scaledCanvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(frameCanvas, 0, 0, 256, 256);
            gif.addFrame(scaledCanvas, { delay: 50, copy: true });
          }
        }
      }

      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${pdbId.toLowerCase()}_${selectedPalette}.gif`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setIsExportingGif(false);
      });

      gif.render();
    } catch (err) {
      console.error('Failed to create GIF:', err);
      setIsExportingGif(false);
    }
  }, [pdbId, selectedPalette]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      let canvas: HTMLCanvasElement | null = null;

      // Use the export function to get transparent canvas
      if (exportFnsRef.current) {
        canvas = exportFnsRef.current.getStaticPng();
      }

      // Fallback to display canvas
      if (!canvas) {
        canvas = document.querySelector(`#viewer-${pdbId} canvas`) as HTMLCanvasElement;
      }

      if (!canvas) return;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas!.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        }, 'image/png');
      });

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);

      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [pdbId]);

  return (
    <div
      className="card card-gold-hover protein-card animate-fade-in group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Viewer with stylized frame */}
      <div className="viewer-frame scanlines crt-glow relative">
        <div
          id={`viewer-${pdbId}`}
          className="viewer-container"
        >
          <ProteinViewer
            pdbId={pdbId}
            autoRotate={!isHovered}
            palette={selectedPalette}
            displayStyle={displayStyle}
            residueCount={residueCount}
            onExportReady={handleExportReady}
          />
        </div>

        {/* Top-left: Category badge */}
        {category && (
          <div className={`absolute top-1.5 left-1.5 category-badge category-${category} z-10`}>
            {CATEGORY_LABELS[category]}
          </div>
        )}

        {/* Top-right: Residue count */}
        {residueCount && (
          <div className="absolute top-1.5 right-1.5 residue-count z-10">
            {residueCount} aa
          </div>
        )}

        {/* Decorative corner accents - gold on hover */}
        <div className="gold-corner absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[var(--accent-primary)] opacity-30" />
        <div className="gold-corner absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[var(--accent-primary)] opacity-30" />
        <div className="gold-corner absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[var(--accent-primary)] opacity-30" />
        <div className="gold-corner absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[var(--accent-primary)] opacity-30" />

        {/* Gold sparkle effect on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-1 h-1 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_6px_#FFD700]" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_6px_#FFD700]" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-1/3 left-4 w-0.5 h-0.5 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_4px_#FFD700]" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>

      {/* Info section */}
      <div className="p-2 flex-1">
        {/* Header: Name and PDB ID */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-[var(--text-primary)] text-[11px] truncate pixel-text leading-tight flex-1">
            {name}
          </h3>
          <a
            href={`https://www.rcsb.org/structure/${pdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[7px] shrink-0 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-tertiary)]/20 text-[var(--text-secondary)] hover:from-[var(--accent-primary)] hover:to-[var(--accent-tertiary)] hover:text-white transition-all font-mono border border-[var(--border-color)]/50"
            onClick={(e) => e.stopPropagation()}
          >
            {pdbId}
          </a>
        </div>

        {/* Controls: Palette + Style icons */}
        <div className="flex items-center gap-2">
          {/* Palette selector */}
          <PaletteSelector
            selected={selectedPalette}
            onSelect={setSelectedPalette}
            compact
          />

          {/* Style selector - icon buttons */}
          <div className="flex items-center gap-0.5">
            {DISPLAY_STYLES.map((style) => (
              <button
                key={style.key}
                onClick={() => setDisplayStyle(style.key)}
                className={`w-5 h-5 flex items-center justify-center rounded transition-all ${
                  displayStyle === style.key
                    ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)]/50'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
                title={style.label}
              >
                <StyleIcon type={style.key} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions - icon only with better styling */}
      <div className="action-bar py-1.5 px-2 gap-1">
        <button
          onClick={handleDownload}
          className="btn btn-secondary flex-1 px-2 py-1 hover:shadow-md"
          title="Download PNG"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        <button
          onClick={handleDownloadGif}
          disabled={isExportingGif}
          className="btn btn-secondary flex-1 px-2 py-1 hover:shadow-md"
          title="Download GIF"
        >
          {isExportingGif ? (
            <span className="animate-pulse text-[8px]">...</span>
          ) : (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="btn btn-secondary flex-1 px-2 py-1 hover:shadow-md"
          title="Copy to clipboard"
        >
          {showCopied ? (
            <svg className="w-3 h-3 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
