import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0d1117',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32">
          <rect x="4" y="2" width="4" height="4" fill="#58a6ff" />
          <rect x="8" y="6" width="4" height="4" fill="#6ab3ff" />
          <rect x="12" y="4" width="4" height="4" fill="#72cca3" />
          <rect x="16" y="8" width="4" height="4" fill="#7ee787" />
          <rect x="12" y="12" width="4" height="4" fill="#97d8b0" />
          <rect x="8" y="16" width="4" height="4" fill="#b3c9d9" />
          <rect x="12" y="20" width="4" height="4" fill="#c5b5ec" />
          <rect x="16" y="18" width="4" height="4" fill="#d2a8ff" />
          <rect x="20" y="22" width="4" height="4" fill="#d2a8ff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
