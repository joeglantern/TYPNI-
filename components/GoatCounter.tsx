'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParamsContext } from './SearchParamsWrapper';

declare global {
  interface Window {
    goatcounter: {
      count: (opts: { path: string; title?: string; event?: boolean }) => void;
    };
  }
}

function GoatCounterInner() {
  const pathname = usePathname();
  const searchParams = useSearchParamsContext();

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

import SearchParamsWrapper from './SearchParamsWrapper';

export default function GoatCounter() {
  return (
    <SearchParamsWrapper>
      <GoatCounterInner />
    </SearchParamsWrapper>
  );
} 
