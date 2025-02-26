'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    goatcounter: {
      count: (opts: { path: string; title?: string; event?: boolean }) => void;
    };
  }
}

export default function GoatCounter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Load GoatCounter script
    const script = document.createElement('script');
    script.dataset.goatcounter = 'https://peppy-starship-50c766.goatcounter.com/count';
    script.async = true;
    script.src = '//gc.zgo.at/count.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Count page views
    if (window.goatcounter && pathname) {
      window.goatcounter.count({
        path: pathname + (searchParams?.toString() ? '?' + searchParams.toString() : ''),
      });
    }
  }, [pathname, searchParams]);

  return null;
} 
