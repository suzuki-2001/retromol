'use client';

import { useState, useEffect } from 'react';

const TITLE = 'Pixel Art Proteins';

export default function TypewriterTitle() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < TITLE.length) {
        setDisplayedText(TITLE.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
      <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
        {displayedText}
      </span>
      <span
        className={`inline-block w-[3px] h-[1em] ml-1 bg-white/80 align-middle transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } ${isComplete ? 'animate-pulse' : ''}`}
      />
    </h1>
  );
}
