/**
 * Type definitions for Next.js 15.2.2 page components
 */

/**
 * Generic params type for dynamic routes
 */
export interface PageParams {
  [key: string]: string;
}

/**
 * Props type for Next.js 15.2.2 page components
 * In Next.js 15.2.2, both params and searchParams are Promises
 */
export type PageProps<T extends PageParams = PageParams> = {
  params: Promise<T>;
  searchParams?: Promise<Record<string, string | string[]>>;
}; 