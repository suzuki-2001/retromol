'use client';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export default function BrandLogo({ size = 24, className = '' }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
    >
      {/* Pixel protein helix - N to C gradient */}
      <rect x="4" y="4" width="5" height="5" fill="#58a6ff" />
      <rect x="9" y="7" width="5" height="5" fill="#6ab3ff" />
      <rect x="14" y="5" width="5" height="5" fill="#7ee787" />
      <rect x="18" y="9" width="5" height="5" fill="#7ee787" />
      <rect x="14" y="14" width="5" height="5" fill="#a3d9a5" />
      <rect x="9" y="18" width="5" height="5" fill="#c5b5ec" />
      <rect x="14" y="22" width="5" height="5" fill="#d2a8ff" />
      <rect x="19" y="19" width="5" height="5" fill="#d2a8ff" opacity="0.7" />
    </svg>
  );
}
