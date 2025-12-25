'use client';

import { useEffect, useRef, useState } from 'react';

// Color palette definitions - Sequential, Diverging, and Qualitative
export const COLOR_PALETTES = {
  // Sequential - Single hue
  blues: {
    name: 'Blues',
    category: 'sequential',
    colors: ['#deebf7', '#3182bd'],
    interpolate: (t: number) => {
      const r = Math.round(222 - t * (222 - 49));
      const g = Math.round(235 - t * (235 - 130));
      const b = Math.round(247 - t * (247 - 189));
      return `rgb(${r},${g},${b})`;
    },
  },
  greens: {
    name: 'Greens',
    category: 'sequential',
    colors: ['#e5f5e0', '#31a354'],
    interpolate: (t: number) => {
      const r = Math.round(229 - t * (229 - 49));
      const g = Math.round(245 - t * (245 - 163));
      const b = Math.round(224 - t * (224 - 84));
      return `rgb(${r},${g},${b})`;
    },
  },
  oranges: {
    name: 'Oranges',
    category: 'sequential',
    colors: ['#feedde', '#e6550d'],
    interpolate: (t: number) => {
      const r = Math.round(254 - t * (254 - 230));
      const g = Math.round(237 - t * (237 - 85));
      const b = Math.round(222 - t * (222 - 13));
      return `rgb(${r},${g},${b})`;
    },
  },
  purples: {
    name: 'Purples',
    category: 'sequential',
    colors: ['#efedf5', '#756bb1'],
    interpolate: (t: number) => {
      const r = Math.round(239 - t * (239 - 117));
      const g = Math.round(237 - t * (237 - 107));
      const b = Math.round(245 - t * (245 - 177));
      return `rgb(${r},${g},${b})`;
    },
  },
  reds: {
    name: 'Reds',
    category: 'sequential',
    colors: ['#fee0d2', '#de2d26'],
    interpolate: (t: number) => {
      const r = Math.round(254 - t * (254 - 222));
      const g = Math.round(224 - t * (224 - 45));
      const b = Math.round(210 - t * (210 - 38));
      return `rgb(${r},${g},${b})`;
    },
  },
  greys: {
    name: 'Greys',
    category: 'sequential',
    colors: ['#f0f0f0', '#636363'],
    interpolate: (t: number) => {
      const v = Math.round(240 - t * (240 - 99));
      return `rgb(${v},${v},${v})`;
    },
  },
  // Sequential - Multi-hue
  viridis: {
    name: 'Viridis',
    category: 'sequential',
    colors: ['#440154', '#21918c', '#fde725'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(68 + s * (33 - 68));
        const g = Math.round(1 + s * (145 - 1));
        const b = Math.round(84 + s * (140 - 84));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(33 + s * (253 - 33));
        const g = Math.round(145 + s * (231 - 145));
        const b = Math.round(140 + s * (37 - 140));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  plasma: {
    name: 'Plasma',
    category: 'sequential',
    colors: ['#0d0887', '#cc4778', '#f0f921'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(13 + s * (204 - 13));
        const g = Math.round(8 + s * (71 - 8));
        const b = Math.round(135 + s * (120 - 135));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(204 + s * (240 - 204));
        const g = Math.round(71 + s * (249 - 71));
        const b = Math.round(120 + s * (33 - 120));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  inferno: {
    name: 'Inferno',
    category: 'sequential',
    colors: ['#000004', '#bc3754', '#fcffa4'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(0 + s * (188 - 0));
        const g = Math.round(0 + s * (55 - 0));
        const b = Math.round(4 + s * (84 - 4));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(188 + s * (252 - 188));
        const g = Math.round(55 + s * (255 - 55));
        const b = Math.round(84 + s * (164 - 84));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  magma: {
    name: 'Magma',
    category: 'sequential',
    colors: ['#000004', '#b63679', '#fcfdbf'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(0 + s * (182 - 0));
        const g = Math.round(0 + s * (54 - 0));
        const b = Math.round(4 + s * (121 - 4));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(182 + s * (252 - 182));
        const g = Math.round(54 + s * (253 - 54));
        const b = Math.round(121 + s * (191 - 121));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  cividis: {
    name: 'Cividis',
    category: 'sequential',
    colors: ['#00224e', '#7d8700', '#ffe945'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(0 + s * (125 - 0));
        const g = Math.round(34 + s * (135 - 34));
        const b = Math.round(78 + s * (0 - 78));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(125 + s * (255 - 125));
        const g = Math.round(135 + s * (233 - 135));
        const b = Math.round(0 + s * (69 - 0));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  bupu: {
    name: 'BuPu',
    category: 'sequential',
    colors: ['#e0ecf4', '#8856a7'],
    interpolate: (t: number) => {
      const r = Math.round(224 - t * (224 - 136));
      const g = Math.round(236 - t * (236 - 86));
      const b = Math.round(244 - t * (244 - 167));
      return `rgb(${r},${g},${b})`;
    },
  },
  ylgn: {
    name: 'YlGn',
    category: 'sequential',
    colors: ['#ffffcc', '#31a354'],
    interpolate: (t: number) => {
      const r = Math.round(255 - t * (255 - 49));
      const g = Math.round(255 - t * (255 - 163));
      const b = Math.round(204 - t * (204 - 84));
      return `rgb(${r},${g},${b})`;
    },
  },
  ylorbr: {
    name: 'YlOrBr',
    category: 'sequential',
    colors: ['#ffffd4', '#cc4c02'],
    interpolate: (t: number) => {
      const r = Math.round(255 - t * (255 - 204));
      const g = Math.round(255 - t * (255 - 76));
      const b = Math.round(212 - t * (212 - 2));
      return `rgb(${r},${g},${b})`;
    },
  },
  // Diverging
  rdbu: {
    name: 'RdBu',
    category: 'diverging',
    colors: ['#b2182b', '#f7f7f7', '#2166ac'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(178 + s * (247 - 178));
        const g = Math.round(24 + s * (247 - 24));
        const b = Math.round(43 + s * (247 - 43));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(247 - s * (247 - 33));
        const g = Math.round(247 - s * (247 - 102));
        const b = Math.round(247 - s * (247 - 172));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  rdylgn: {
    name: 'RdYlGn',
    category: 'diverging',
    colors: ['#d73027', '#ffffbf', '#1a9850'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(215 + s * (255 - 215));
        const g = Math.round(48 + s * (255 - 48));
        const b = Math.round(39 + s * (191 - 39));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(255 - s * (255 - 26));
        const g = Math.round(255 - s * (255 - 152));
        const b = Math.round(191 - s * (191 - 80));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  spectral: {
    name: 'Spectral',
    category: 'diverging',
    colors: ['#d53e4f', '#ffffbf', '#3288bd'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(213 + s * (255 - 213));
        const g = Math.round(62 + s * (255 - 62));
        const b = Math.round(79 + s * (191 - 79));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(255 - s * (255 - 50));
        const g = Math.round(255 - s * (255 - 136));
        const b = Math.round(191 - s * (191 - 189));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  coolwarm: {
    name: 'Coolwarm',
    category: 'diverging',
    colors: ['#3b4cc0', '#f7f7f7', '#b40426'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(59 + s * (247 - 59));
        const g = Math.round(76 + s * (247 - 76));
        const b = Math.round(192 + s * (247 - 192));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(247 - s * (247 - 180));
        const g = Math.round(247 - s * (247 - 4));
        const b = Math.round(247 - s * (247 - 38));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  // Qualitative / Special
  rainbow: {
    name: 'Rainbow',
    category: 'qualitative',
    colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6'],
    interpolate: (t: number) => {
      const hue = t * 300;
      const s = 0.8;
      const l = 0.6;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (hue < 60) { r = c; g = x; b = 0; }
      else if (hue < 120) { r = x; g = c; b = 0; }
      else if (hue < 180) { r = 0; g = c; b = x; }
      else if (hue < 240) { r = 0; g = x; b = c; }
      else if (hue < 300) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }
      return `rgb(${Math.round((r + m) * 255)},${Math.round((g + m) * 255)},${Math.round((b + m) * 255)})`;
    },
  },
  twilight: {
    name: 'Twilight',
    category: 'qualitative',
    colors: ['#e2d9e2', '#5e4fa2', '#e2d9e2'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(226 - s * (226 - 94));
        const g = Math.round(217 - s * (217 - 79));
        const b = Math.round(226 - s * (226 - 162));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(94 + s * (226 - 94));
        const g = Math.round(79 + s * (217 - 79));
        const b = Math.round(162 + s * (226 - 162));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  ocean: {
    name: 'Ocean',
    category: 'sequential',
    colors: ['#004c6d', '#88d0d1'],
    interpolate: (t: number) => {
      const r = Math.round(0 + t * (136 - 0));
      const g = Math.round(76 + t * (208 - 76));
      const b = Math.round(109 + t * (209 - 109));
      return `rgb(${r},${g},${b})`;
    },
  },
  // Additional palettes
  sunset: {
    name: 'Sunset',
    category: 'sequential',
    colors: ['#ff6b6b', '#feca57', '#ff9ff3'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(255);
        const g = Math.round(107 + s * (202 - 107));
        const b = Math.round(107 - s * (107 - 87));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(255);
        const g = Math.round(202 - s * (202 - 159));
        const b = Math.round(87 + s * (243 - 87));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  mint: {
    name: 'Mint',
    category: 'sequential',
    colors: ['#d4fc79', '#96e6a1'],
    interpolate: (t: number) => {
      const r = Math.round(212 - t * (212 - 150));
      const g = Math.round(252 - t * (252 - 230));
      const b = Math.round(121 + t * (161 - 121));
      return `rgb(${r},${g},${b})`;
    },
  },
  cherry: {
    name: 'Cherry',
    category: 'sequential',
    colors: ['#ffafcc', '#a4133c'],
    interpolate: (t: number) => {
      const r = Math.round(255 - t * (255 - 164));
      const g = Math.round(175 - t * (175 - 19));
      const b = Math.round(204 - t * (204 - 60));
      return `rgb(${r},${g},${b})`;
    },
  },
  cyber: {
    name: 'Cyber',
    category: 'qualitative',
    colors: ['#00f5d4', '#7b2cbf', '#f72585'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(0 + s * (123 - 0));
        const g = Math.round(245 - s * (245 - 44));
        const b = Math.round(212 - s * (212 - 191));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(123 + s * (247 - 123));
        const g = Math.round(44 - s * (44 - 37));
        const b = Math.round(191 - s * (191 - 133));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  forest: {
    name: 'Forest',
    category: 'sequential',
    colors: ['#134e5e', '#71b280'],
    interpolate: (t: number) => {
      const r = Math.round(19 + t * (113 - 19));
      const g = Math.round(78 + t * (178 - 78));
      const b = Math.round(94 + t * (128 - 94));
      return `rgb(${r},${g},${b})`;
    },
  },
  lavender: {
    name: 'Lavender',
    category: 'sequential',
    colors: ['#e0c3fc', '#8ec5fc'],
    interpolate: (t: number) => {
      const r = Math.round(224 - t * (224 - 142));
      const g = Math.round(195 + t * (197 - 195));
      const b = Math.round(252);
      return `rgb(${r},${g},${b})`;
    },
  },
  gold: {
    name: 'Gold',
    category: 'sequential',
    colors: ['#ffecd2', '#fcb69f'],
    interpolate: (t: number) => {
      const r = Math.round(255 - t * (255 - 252));
      const g = Math.round(236 - t * (236 - 182));
      const b = Math.round(210 - t * (210 - 159));
      return `rgb(${r},${g},${b})`;
    },
  },
  neon: {
    name: 'Neon',
    category: 'qualitative',
    colors: ['#39ff14', '#ff073a', '#00fff7'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(57 + s * (255 - 57));
        const g = Math.round(255 - s * (255 - 7));
        const b = Math.round(20 + s * (58 - 20));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(255 - s * (255 - 0));
        const g = Math.round(7 + s * (255 - 7));
        const b = Math.round(58 + s * (247 - 58));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
  earth: {
    name: 'Earth',
    category: 'sequential',
    colors: ['#8b4513', '#deb887', '#228b22'],
    interpolate: (t: number) => {
      if (t < 0.5) {
        const s = t * 2;
        const r = Math.round(139 + s * (222 - 139));
        const g = Math.round(69 + s * (184 - 69));
        const b = Math.round(19 + s * (135 - 19));
        return `rgb(${r},${g},${b})`;
      } else {
        const s = (t - 0.5) * 2;
        const r = Math.round(222 - s * (222 - 34));
        const g = Math.round(184 - s * (184 - 139));
        const b = Math.round(135 - s * (135 - 34));
        return `rgb(${r},${g},${b})`;
      }
    },
  },
} as const;

export type PaletteKey = keyof typeof COLOR_PALETTES;

// Display style types for 3Dmol.js
export type DisplayStyle = 'cartoon' | 'stick' | 'sphere' | 'surface';

export const DISPLAY_STYLES: { key: DisplayStyle; label: string; icon: string }[] = [
  { key: 'cartoon', label: 'Cartoon', icon: '🎗️' },
  { key: 'stick', label: 'Stick', icon: '🥢' },
  { key: 'sphere', label: 'Sphere', icon: '⚪' },
  { key: 'surface', label: 'Surface', icon: '🫧' },
];

export interface ExportFunctions {
  getStaticPng: () => HTMLCanvasElement | null;
  captureGifFrame: () => HTMLCanvasElement | null;
  getViewer: () => any;
}

interface ProteinViewerProps {
  pdbId?: string;
  pdbData?: string;
  format?: 'pdb' | 'cif';
  autoRotate?: boolean;
  palette?: PaletteKey;
  displayStyle?: DisplayStyle;
  residueCount?: number;
  pixelSizeOverride?: number; // Manual pixel size (2-10)
  onExportReady?: (exportFns: ExportFunctions) => void;
}

declare global {
  interface Window {
    $3Dmol: any;
  }
}

const BG_COLOR = { r: 13, g: 17, b: 23 }; // #0d1117 (GitHub dark bg)

// Calculate optimal pixel size based on display size and protein complexity
// Goal: Fine detail while maintaining retro aesthetic
const getPixelSize = (displaySize: number, residueCount?: number): number => {
  // Target more pixels for finer detail
  // Aim for ~60-80 pixels across for good structure visibility
  let targetPixels: number;
  if (displaySize <= 150) {
    targetPixels = 40; // Small: still show detail
  } else if (displaySize <= 200) {
    targetPixels = 50; // Medium-small
  } else if (displaySize <= 300) {
    targetPixels = 60; // Medium: good detail
  } else {
    targetPixels = 75; // Large: fine detail
  }

  let pixelSize = Math.round(displaySize / targetPixels);

  // Adjust for protein complexity (residue count)
  if (residueCount) {
    if (residueCount >= 300) {
      // Large proteins: finest detail
      pixelSize = Math.max(2, pixelSize - 1);
    } else if (residueCount >= 200) {
      // Medium-large: slightly finer
      pixelSize = Math.max(3, Math.round(pixelSize * 0.85));
    } else if (residueCount <= 100) {
      // Small proteins: can be slightly chunkier
      pixelSize = Math.min(pixelSize + 1, 6);
    }
  }

  // Clamp to reasonable range: 2-7 pixels
  // 2 = finest (for complex structures on large displays)
  // 7 = chunkiest (still shows good detail)
  return Math.min(7, Math.max(2, pixelSize));
};

export default function ProteinViewer({
  pdbId,
  pdbData,
  format = 'pdb',
  autoRotate = true,
  palette = 'bupu',
  displayStyle = 'cartoon',
  residueCount,
  pixelSizeOverride,
  onExportReady,
}: ProteinViewerProps) {
  const [displaySize, setDisplaySize] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<any>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelSizeRef = useRef(pixelSizeOverride);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep pixelSizeRef in sync
  useEffect(() => {
    pixelSizeRef.current = pixelSizeOverride;
  }, [pixelSizeOverride]);

  useEffect(() => {
    if (!containerRef.current || !hiddenContainerRef.current || !canvasRef.current) return;

    let mounted = true;
    let animationId: number;

    const loadScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.$3Dmol) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.0.3/3Dmol-min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load 3Dmol.js'));
        document.head.appendChild(script);
      });
    };

    const fetchPDB = async (id: string): Promise<string> => {
      const response = await fetch(`https://files.rcsb.org/download/${id}.pdb`);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDB: ${id}`);
      }
      return response.text();
    };

    // Check if pixel is background color
    const isBackground = (r: number, g: number, b: number): boolean => {
      return Math.abs(r - BG_COLOR.r) < 20 && Math.abs(g - BG_COLOR.g) < 20 && Math.abs(b - BG_COLOR.b) < 20;
    };

    // Pixelate with outline - supports both display (with bg) and export (transparent bg)
    const pixelateWithOutline = (
      sourceCanvas: HTMLCanvasElement,
      targetCanvas: HTMLCanvasElement,
      transparentBg: boolean = false,
      customPixelSize?: number
    ) => {
      const ctx = targetCanvas.getContext('2d');
      if (!ctx || sourceCanvas.width === 0 || sourceCanvas.height === 0) return;

      const w = targetCanvas.width;
      const h = targetCanvas.height;
      const pxSize = customPixelSize || pixelSizeRef.current || getPixelSize(w, residueCount);
      const pixelW = Math.ceil(w / pxSize);
      const pixelH = Math.ceil(h / pxSize);

      // Create temp canvas for pixelation
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = pixelW;
      tempCanvas.height = pixelH;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Draw source at small size
      tempCtx.imageSmoothingEnabled = false;
      tempCtx.drawImage(sourceCanvas, 0, 0, pixelW, pixelH);

      // Get image data
      const imageData = tempCtx.getImageData(0, 0, pixelW, pixelH);
      const data = imageData.data;

      // Create output image data with outline
      const outData = new Uint8ClampedArray(data);

      // First pass: mark outline pixels and optionally make bg transparent
      for (let y = 0; y < pixelH; y++) {
        for (let x = 0; x < pixelW; x++) {
          const i = (y * pixelW + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (isBackground(r, g, b)) {
            if (transparentBg) {
              // Make background fully transparent for export
              outData[i] = 0;
              outData[i + 1] = 0;
              outData[i + 2] = 0;
              outData[i + 3] = 0;
            }
          }
        }
      }

      // Second pass: add outline
      for (let y = 0; y < pixelH; y++) {
        for (let x = 0; x < pixelW; x++) {
          const i = (y * pixelW + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If this pixel is NOT background (it's part of the protein)
          if (!isBackground(r, g, b)) {
            // Check all 4 neighbors
            const neighbors = [
              { dx: -1, dy: 0 },
              { dx: 1, dy: 0 },
              { dx: 0, dy: -1 },
              { dx: 0, dy: 1 },
            ];

            for (const { dx, dy } of neighbors) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < pixelW && ny >= 0 && ny < pixelH) {
                const ni = (ny * pixelW + nx) * 4;
                const nr = data[ni];
                const ng = data[ni + 1];
                const nb = data[ni + 2];

                // If neighbor is background, make it an outline
                if (isBackground(nr, ng, nb)) {
                  outData[ni] = 45;     // Slightly lighter outline for visibility
                  outData[ni + 1] = 50;
                  outData[ni + 2] = 60;
                  outData[ni + 3] = 255; // Opaque outline even in transparent mode
                }
              }
            }
          }
        }
      }

      // Put outlined data back
      tempCtx.putImageData(new ImageData(outData, pixelW, pixelH), 0, 0);

      // Clear and scale up to final size
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tempCanvas, 0, 0, w, h);
    };

    // Create export canvas with transparent background
    const createExportCanvas = (): HTMLCanvasElement | null => {
      const mol3dCanvas = hiddenContainerRef.current?.querySelector('canvas') as HTMLCanvasElement;
      if (!mol3dCanvas) return null;

      const size = 512; // Fixed export size
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = size;
      exportCanvas.height = size;

      // Use fixed pixel size for exports (consistent output)
      pixelateWithOutline(mol3dCanvas, exportCanvas, true, 8);
      return exportCanvas;
    };

    exportCanvasRef.current = null;

    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await loadScript();

        let modelData: string;
        if (pdbData) {
          modelData = pdbData;
        } else if (pdbId) {
          modelData = await fetchPDB(pdbId);
        } else {
          throw new Error('No PDB ID or data provided');
        }

        if (!mounted || !hiddenContainerRef.current || !canvasRef.current) return;

        const hiddenContainer = hiddenContainerRef.current;
        const displayCanvas = canvasRef.current;

        const size = containerRef.current?.clientWidth || 300;
        setDisplaySize(size);
        displayCanvas.width = size;
        displayCanvas.height = size;
        hiddenContainer.style.width = `${size}px`;
        hiddenContainer.style.height = `${size}px`;

        hiddenContainer.innerHTML = '';

        const viewer = window.$3Dmol.createViewer(hiddenContainer, {
          backgroundColor: '#0d1117',
          antialias: true,
        });

        if (!viewer) {
          throw new Error('Failed to create viewer');
        }

        viewerRef.current = viewer;
        // 3Dmol uses 'cif' for mmCIF format
        const modelFormat = pdbData ? format : 'pdb';
        viewer.addModel(modelData, modelFormat);

        const colorPalette = COLOR_PALETTES[palette];

        // Color function based on residue index
        const colorfunc = (atom: any) => {
          const residueIndex = atom.resi;
          const atoms = viewer.selectedAtoms({});
          const chainAtoms = atoms.filter((a: any) => a.chain === atom.chain);
          const minResi = Math.min(...chainAtoms.map((a: any) => a.resi));
          const maxResi = Math.max(...chainAtoms.map((a: any) => a.resi));
          const t = (residueIndex - minResi) / (maxResi - minResi || 1);
          return colorPalette.interpolate(t);
        };

        // Apply style based on displayStyle prop
        switch (displayStyle) {
          case 'cartoon':
            viewer.setStyle({}, { cartoon: { colorfunc } });
            break;
          case 'stick':
            viewer.setStyle({}, { stick: { colorfunc, radius: 0.15 } });
            break;
          case 'sphere':
            viewer.setStyle({}, { sphere: { colorfunc, scale: 0.25 } });
            break;
          case 'surface':
            // Surface needs atoms to be visible first, then add surface
            viewer.setStyle({}, { cartoon: { opacity: 0 } });
            viewer.addSurface(window.$3Dmol.SurfaceType.VDW, {
              opacity: 0.9,
              colorfunc,
            });
            break;
          default:
            viewer.setStyle({}, { cartoon: { colorfunc } });
        }

        viewer.zoomTo();
        viewer.render();

        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);

        // Notify parent that export is ready
        if (onExportReady) {
          onExportReady({
            getStaticPng: createExportCanvas,
            captureGifFrame: createExportCanvas,
            getViewer: () => viewerRef.current,
          });
        }

        const animate = () => {
          if (!mounted || !viewerRef.current) return;

          if (autoRotate) {
            viewerRef.current.rotate(0.5, 'y');
          }
          viewerRef.current.render();

          const mol3dCanvas = hiddenContainer.querySelector('canvas') as HTMLCanvasElement;
          if (mol3dCanvas && displayCanvas) {
            pixelateWithOutline(mol3dCanvas, displayCanvas);
          }

          animationId = requestAnimationFrame(animate);
        };
        animate();

      } catch (err) {
        console.error('Viewer error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load');
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (animationId) cancelAnimationFrame(animationId);
      viewerRef.current = null;
    };
  }, [pdbId, pdbData, format, autoRotate, palette, displayStyle, residueCount, onExportReady]);

  return (
    <div className="relative w-full h-full min-h-[200px] overflow-hidden">
      <div
        ref={hiddenContainerRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          visibility: 'hidden',
        }}
      />

      <div ref={containerRef} className="w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117]">
          <div className="text-[var(--accent-primary)] font-mono text-sm opacity-60">Loading...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117]">
          <div className="text-red-400 font-mono text-xs text-center px-4">{error}</div>
        </div>
      )}
    </div>
  );
}
