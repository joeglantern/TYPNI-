'use client';

import { createContext, useContext, Suspense } from 'react';
import { useSearchParams as useNextSearchParams } from 'next/navigation';

const SearchParamsContext = createContext<ReturnType<typeof useNextSearchParams> | null>(null);

export function useSearchParamsContext() {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error('useSearchParamsContext must be used within a SearchParamsProvider');
  }
  return context;
}

function SearchParamsProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useNextSearchParams();
  return (
    <SearchParamsContext.Provider value={searchParams}>
      {children}
    </SearchParamsContext.Provider>
  );
}

export default function SearchParamsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SearchParamsProvider>{children}</SearchParamsProvider>
    </Suspense>
  );
} 