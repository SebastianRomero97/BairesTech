'use client';

import { useTheme } from 'next-themes';

export function useSmoothTheme(duration = 450) {
  const { setTheme } = useTheme();

  const smoothSetTheme = (next: string) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setTheme(next);
    window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, duration);
  };

  return { smoothSetTheme };
}
