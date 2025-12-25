'use client';

import { useEffect, useRef, useState } from 'react';
import { COLOR_PALETTES, type PaletteKey } from './ProteinViewer';


const GFP_PDB_ID = '1EMA';

function interpolateColor(colors: readonly string[], t: number): string {
  const n = colors.length - 1;
  const i = Math.min(Math.floor(t * n), n - 1);
  const f = t * n - i;

  const c1 = colors[i];
  const c2 = colors[i + 1];

  const r1 = parseInt(c1.slice(1, 3), 16);
  const g1 = parseInt(c1.slice(3, 5), 16);
  const b1 = parseInt(c1.slice(5, 7), 16);

  const r2 = parseInt(c2.slice(1, 3), 16);
  const g2 = parseInt(c2.slice(3, 5), 16);
  const b2 = parseInt(c2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * f);
  const g = Math.round(g1 + (g2 - g1) * f);
  const b = Math.round(b1 + (b2 - b1) * f);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<InstanceType<typeof window.$3Dmol.GLViewer> | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const palette: PaletteKey = 'viridis';
  // GFP has 238 residues, 600px canvas -> pixel size 6 for fine detail
  const pixelSize = 6;

  useEffect(() => {
    const loadScript = () => {
      return new Promise<void>((resolve) => {
        if (window.$3Dmol) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://3dmol.org/build/3Dmol-min.js';
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const init = async () => {
      await loadScript();

      if (!containerRef.current || !window.$3Dmol) return;

      const viewer = window.$3Dmol.createViewer(containerRef.current, {
        backgroundColor: 'black',
        antialias: true,
      });

      viewerRef.current = viewer;

      try {
        const response = await fetch(
          `https://files.rcsb.org/download/${GFP_PDB_ID}.pdb`
        );
        const pdbData = await response.text();

        viewer.addModel(pdbData, 'pdb');

        const atoms = viewer.getModel(0).selectedAtoms({});
        const residueIndices = new Map<number, number>();
        let idx = 0;
        atoms.forEach((atom: { resi: number }) => {
          if (!residueIndices.has(atom.resi)) {
            residueIndices.set(atom.resi, idx++);
          }
        });

        const totalResidues = residueIndices.size;
        const colors = COLOR_PALETTES[palette].colors;

        const colorFunc = (atom: { resi: number }) => {
          const residueIdx = residueIndices.get(atom.resi) || 0;
          const t = totalResidues > 1 ? residueIdx / (totalResidues - 1) : 0;
          return interpolateColor(colors, t);
        };

        viewer.setStyle({}, {
          cartoon: {
            colorfunc: colorFunc,
            thickness: 0.4,
          },
        });

        viewer.zoomTo();
        viewer.zoom(0.85);
        viewer.render();

        setIsLoaded(true);

        // Start rotation animation
        const animate = () => {
          if (viewerRef.current) {
            viewerRef.current.rotate(0.3, 'y');
            viewerRef.current.render();
            pixelate();
          }
          animationRef.current = requestAnimationFrame(animate);
        };

        animate();
      } catch (error) {
        console.error('Failed to load GFP:', error);
      }
    };

    const pixelate = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const sourceCanvas = containerRef.current.querySelector('canvas');
      if (!sourceCanvas) return;

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      ctx.clearRect(0, 0, width, height);

      // Draw source to get pixel data
      ctx.drawImage(sourceCanvas, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      ctx.clearRect(0, 0, width, height);

      // Pixelate
      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          let r = 0, g = 0, b = 0, count = 0;

          for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
            for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              const pr = data[idx];
              const pg = data[idx + 1];
              const pb = data[idx + 2];
              // Skip black background pixels
              if (pr > 15 || pg > 15 || pb > 15) {
                r += pr;
                g += pg;
                b += pb;
                count++;
              }
            }
          }

          if (count > pixelSize * pixelSize * 0.1) {
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);

            ctx.fillStyle = `rgba(${r},${g},${b},0.25)`;
            ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
          }
        }
      }
    };

    init();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (viewerRef.current) {
        viewerRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hidden 3Dmol container */}
      <div
        ref={containerRef}
        className="absolute opacity-0 pointer-events-none"
        style={{ width: 600, height: 600 }}
      />
      {/* Visible pixelated canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: 600,
          height: 600,
        }}
      />
    </div>
  );
}
