'use client';

import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BrandLogo size={24} className="opacity-70" />
              <span className="text-[var(--text-secondary)] font-semibold">RetroMol</span>
            </div>
            <p className="text-[var(--text-muted)] text-xs leading-relaxed">
              Pixel art protein visualization. Generate retro-style icons from any PDB structure.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.rcsb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] text-xs hover:text-[var(--accent-primary)] transition-colors"
                >
                  RCSB Protein Data Bank
                </a>
              </li>
              <li>
                <a
                  href="https://3dmol.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] text-xs hover:text-[var(--accent-primary)] transition-colors"
                >
                  3Dmol.js Library
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/suzuki-2001/retromol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] text-xs hover:text-[var(--accent-primary)] transition-colors"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </div>

          {/* License */}
          <div>
            <h3 className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider mb-3">
              License
            </h3>
            <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-2">
              All generated images are released under{' '}
              <a
                href="https://creativecommons.org/publicdomain/zero/1.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-primary)] hover:underline"
              >
                CC0 1.0
              </a>{' '}
              (Public Domain).
            </p>
            <p className="text-[var(--text-muted)] text-xs">
              Free for any use, no attribution required.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[var(--text-muted)] text-[10px]">
              2024 RetroMol. Made with 3Dmol.js and data from RCSB PDB.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                <span>N-term</span>
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#58a6ff] via-[#7ee787] to-[#d2a8ff]" />
                <span>C-term</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
