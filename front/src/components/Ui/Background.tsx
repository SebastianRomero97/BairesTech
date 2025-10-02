'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Background() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const bgImage =
    mounted && resolvedTheme === 'dark'
      ? '/landingDark.png'
      : '/landingLight.png';

  return (
    <div className="absolute inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={bgImage}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-[var(--hero-overlay)]" />
    </div>
  );
}
