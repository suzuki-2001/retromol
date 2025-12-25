'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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

type InputMode = 'search' | 'upload';

type FileFormat = 'pdb' | 'cif';

interface LoadedProtein {
  mode: InputMode;
  pdbId?: string;
  pdbData?: string;
  format?: FileFormat;
  title: string;
}

export default function PdbInput() {
  const [mode, setMode] = useState<InputMode>('search');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<LoadedProtein | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState<PaletteKey>('blues');
  const [showCopied, setShowCopied] = useState(false);
  const [showShareCopied, setShowShareCopied] = useState(false);
  const [isExportingGif, setIsExportingGif] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pixelSize, setPixelSize] = useState<number>(0); // 0 = auto
  const [displayStyle, setDisplayStyle] = useState<DisplayStyle>('cartoon');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportFnsRef = useRef<ExportFunctions | null>(null);
  const initialLoadDone = useRef(false);

  // Load from URL params on mount
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    const params = new URLSearchParams(window.location.search);
    const pdbParam = params.get('pdb');
    const paletteParam = params.get('palette') as PaletteKey | null;

    if (paletteParam) {
      setSelectedPalette(paletteParam);
    }

    if (pdbParam && /^[A-Z0-9]{4}$/i.test(pdbParam)) {
      const pdbId = pdbParam.toUpperCase();
      setSearchInput(pdbId);
      // Auto-load the protein
      (async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://files.rcsb.org/download/${pdbId}.pdb`);
          if (!response.ok) throw new Error('Not found');

          let title = pdbId;
          try {
            const meta = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${pdbId}`);
            if (meta.ok) {
              const data = await meta.json();
              title = data.struct?.title || pdbId;
            }
          } catch {}

          setLoaded({ mode: 'search', pdbId, title });
        } catch {
          setError(`PDB not found: ${pdbId}`);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, []);

  const handleExportReady = useCallback((exportFns: ExportFunctions) => {
    exportFnsRef.current = exportFns;
  }, []);

  const handleSearch = useCallback(async () => {
    const pdbId = searchInput.trim().toUpperCase();
    if (!pdbId) return;

    if (!/^[A-Z0-9]{4}$/i.test(pdbId)) {
      setError('Enter 4-character PDB ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    exportFnsRef.current = null;

    try {
      const response = await fetch(`https://files.rcsb.org/download/${pdbId}.pdb`);
      if (!response.ok) throw new Error('Not found');

      let title = pdbId;
      try {
        const meta = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${pdbId}`);
        if (meta.ok) {
          const data = await meta.json();
          title = data.struct?.title || pdbId;
        }
      } catch {}

      setLoaded({ mode: 'search', pdbId, title });
    } catch {
      setError(`PDB not found: ${pdbId}`);
    } finally {
      setIsLoading(false);
    }
  }, [searchInput]);

  const handleFile = useCallback((file: File) => {
    const lowerName = file.name.toLowerCase();
    const isPdb = lowerName.endsWith('.pdb') || lowerName.endsWith('.ent');
    const isCif = lowerName.endsWith('.cif') || lowerName.endsWith('.mmcif');

    if (!isPdb && !isCif) {
      setError('Only .pdb or .cif files');
      return;
    }

    setIsLoading(true);
    setError(null);
    exportFnsRef.current = null;

    const reader = new FileReader();
    reader.onload = (e) => {
      setLoaded({
        mode: 'upload',
        pdbData: e.target?.result as string,
        format: isCif ? 'cif' : 'pdb',
        title: file.name,
      });
      setIsLoading(false);
    };
    reader.readAsText(file);
  }, []);

  const handleClear = useCallback(() => {
    setLoaded(null);
    setSearchInput('');
    setError(null);
    exportFnsRef.current = null;
  }, []);

  const handleDownload = useCallback(async () => {
    if (!loaded) return;
    const canvas = exportFnsRef.current?.getStaticPng();
    if (!canvas) return;

    const name = loaded.mode === 'search'
      ? loaded.pdbId?.toLowerCase()
      : loaded.title.replace(/\.(pdb|ent)$/i, '');

    const link = document.createElement('a');
    link.download = `${name}_${selectedPalette}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [loaded, selectedPalette]);

  const handleDownloadGif = useCallback(async () => {
    if (!exportFnsRef.current || !loaded) return;
    setIsExportingGif(true);

    try {
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
      if (!viewer) { setIsExportingGif(false); return; }

      for (let i = 0; i < 36; i++) {
        viewer.rotate(10, 'y');
        viewer.render();
        await new Promise(r => setTimeout(r, 50));

        const frame = exportFnsRef.current.captureGifFrame();
        if (frame) {
          const scaled = document.createElement('canvas');
          scaled.width = scaled.height = 256;
          const ctx = scaled.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(frame, 0, 0, 256, 256);
            gif.addFrame(scaled, { delay: 50, copy: true });
          }
        }
      }

      const name = loaded.mode === 'search'
        ? loaded.pdbId?.toLowerCase()
        : loaded.title.replace(/\.(pdb|ent)$/i, '');

      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${name}_${selectedPalette}.gif`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setIsExportingGif(false);
      });

      gif.render();
    } catch {
      setIsExportingGif(false);
    }
  }, [loaded, selectedPalette]);

  const handleCopy = useCallback(async () => {
    const canvas = exportFnsRef.current?.getStaticPng();
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => b ? resolve(b) : reject(), 'image/png');
      });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {}
  }, []);

  // Not loaded yet - show input UI
  if (!loaded) {
    return (
      <div className="max-w-md mx-auto">
        {/* Tab switcher */}
        <div className="flex justify-center gap-1 mb-4">
          <button
            onClick={() => { setMode('search'); setError(null); }}
            className={`px-4 py-1.5 text-xs rounded transition-colors ${
              mode === 'search'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            PDB ID
          </button>
          <button
            onClick={() => { setMode('upload'); setError(null); }}
            className={`px-4 py-1.5 text-xs rounded transition-colors ${
              mode === 'upload'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Upload
          </button>
        </div>

        {mode === 'search' ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput ?? ''}
              onChange={(e) => setSearchInput((e.target.value ?? '').toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="1CRN"
              maxLength={4}
              className="flex-1 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-[var(--text-primary)] text-center font-mono uppercase tracking-widest placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-all glow-border"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="btn btn-primary px-4"
            >
              {isLoading ? '...' : 'Go'}
            </button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
                : 'border-[var(--border-color)] hover:border-[var(--accent-primary)]'
            }`}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdb,.ent,.cif,.mmcif"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            <svg className="w-6 h-6 text-[var(--text-muted)] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-[var(--text-muted)] text-xs">Drop .pdb/.cif or click</p>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
        )}
      </div>
    );
  }

  // Loaded - show result card
  return (
    <div className="max-w-sm mx-auto animate-fade-in">
      <div
        className="card card-gold-hover group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="viewer-frame scanlines crt-glow">
          <div id="viewer-input" className="viewer-container">
            <ProteinViewer
              pdbId={loaded.mode === 'search' ? loaded.pdbId : undefined}
              pdbData={loaded.mode === 'upload' ? loaded.pdbData : undefined}
              format={loaded.format}
              autoRotate={!isHovered}
              palette={selectedPalette}
              displayStyle={displayStyle}
              pixelSizeOverride={pixelSize || undefined}
              onExportReady={handleExportReady}
            />
          </div>
          <div className="gold-corner absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[var(--accent-primary)] opacity-30" />
          <div className="gold-corner absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[var(--accent-primary)] opacity-30" />
          <div className="gold-corner absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[var(--accent-primary)] opacity-30" />
          <div className="gold-corner absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[var(--accent-primary)] opacity-30" />
        </div>

        <div className="p-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-[var(--text-primary)] font-medium text-xs truncate">
                {loaded.mode === 'search' ? (
                  <a
                    href={`https://www.rcsb.org/structure/${loaded.pdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-primary)] transition-colors"
                  >
                    {loaded.pdbId}
                  </a>
                ) : loaded.title}
              </h3>
              <p className="text-[var(--text-muted)] text-[10px] truncate">
                {loaded.mode === 'search' ? loaded.title : 'Custom upload'}
              </p>
            </div>
            <button
              onClick={handleClear}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <PaletteSelector selected={selectedPalette} onSelect={setSelectedPalette} compact />

          {/* Display style selector */}
          <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
            <span className="text-[10px] text-[var(--text-muted)] block mb-1.5">Style</span>
            <div className="flex gap-1">
              {DISPLAY_STYLES.map((style) => (
                <button
                  key={style.key}
                  onClick={() => setDisplayStyle(style.key)}
                  className={`flex-1 py-1 px-1 text-[9px] rounded transition-all ${
                    displayStyle === style.key
                      ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                  title={style.label}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pixel size slider */}
          <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[var(--text-muted)]">Pixel Size</span>
              <span className="text-[10px] text-[var(--text-secondary)] font-mono">
                {pixelSize === 0 ? 'Auto' : `${pixelSize}px`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={pixelSize}
              onChange={(e) => setPixelSize(Number(e.target.value))}
              className="pixel-slider"
            />
            <div className="flex justify-between text-[8px] text-[var(--text-muted)] mt-0.5">
              <span>Auto</span>
              <span>Fine</span>
              <span>Chunky</span>
            </div>
          </div>
        </div>

        <div className="action-bar">
          <button onClick={handleDownload} className="btn btn-secondary flex-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PNG
          </button>
          <button onClick={handleDownloadGif} disabled={isExportingGif} className="btn btn-secondary flex-1">
            {isExportingGif ? '...' : 'GIF'}
          </button>
          <button onClick={handleCopy} className="btn btn-secondary flex-1">
            {showCopied ? 'OK' : 'Copy'}
          </button>
          {loaded?.mode === 'search' && (
            <button
              onClick={() => {
                const url = `${window.location.origin}?pdb=${loaded.pdbId}&palette=${selectedPalette}`;
                navigator.clipboard.writeText(url);
                setShowShareCopied(true);
                setTimeout(() => setShowShareCopied(false), 2000);
              }}
              className="btn btn-secondary flex-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {showShareCopied ? 'OK' : 'Share'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
