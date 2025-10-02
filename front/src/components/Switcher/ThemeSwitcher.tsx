'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useSmoothTheme } from '@/hooks/useSmoothTheme';

export default function ThemeFloatToggle() {
  const { theme, resolvedTheme } = useTheme();
  const { smoothSetTheme } = useSmoothTheme(450);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Cambiar tema"
        className={[
          'fixed left-4 top-4 z-[60]',
          'h-12 w-12 rounded-full border  border-[var(--nav-border)]',
          'bg-[var(--nav-bg)]/70 backdrop-blur-md shadow-lg',
          'transition-all flex items-center justify-center'
        ].join(' ')}
      >
        <span className="h-6 w-6" />
      </button>
    );
  }


  const current = (theme === 'system' ? resolvedTheme : theme) || 'light';
  const isDark = current === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      onClick={() => smoothSetTheme(isDark ? 'light' : 'dark')}
      className={[
        'fixed left-4 top-4 z-[60]',
        'h-12 w-12 rounded-full border border-[var(--nav-border)]',
        'bg-[var(--nav-bg)]/70 backdrop-blur-md shadow-lg hover:shadow-xl',
        'transition-all flex items-center justify-center',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-400)]',
        'cursor-pointer'
      ].join(' ')}
    >
      {isDark ? <FiMoon className="h-6 w-6" /> : <FiSun className="h-6 w-6" />}
    </button>
  );
}
