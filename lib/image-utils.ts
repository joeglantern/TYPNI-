/**
 * Utility functions for image optimization
 */

/**
 * Generate a low-quality image placeholder
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param color Color of the placeholder (hex code without #)
 * @returns Base64 encoded SVG
 */
export function generatePlaceholder(width: number, height: number, color: string = 'e2e8f0'): string {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="#${color}"/></svg>`;
  const toBase64 = typeof window === 'undefined' 
    ? Buffer.from(svg).toString('base64')
    : window.btoa(svg);
  return `data:image/svg+xml;base64,${toBase64}`;
}

/**
 * Calculate responsive image sizes based on container width
 * @param containerWidth Width of the container as a percentage or fixed value
 * @returns Sizes string for Next.js Image component
 */
export function getResponsiveSizes(containerWidth: string): string {
  // Parse the container width
  const isPercentage = containerWidth.endsWith('%');
  const widthValue = parseInt(containerWidth);
  
  if (isPercentage) {
    return `(max-width: 640px) 100vw, (max-width: 768px) ${Math.min(100, widthValue * 1.2)}vw, (max-width: 1024px) ${widthValue}vw, (max-width: 1280px) ${widthValue * 0.8}vw, ${widthValue * 0.7}vw`;
  } else {
    // For fixed width containers
    return `(max-width: 640px) min(100vw, ${widthValue}px), ${widthValue}px`;
  }
}

/**
 * Determine if an image should be loaded with priority based on viewport position
 * @param index Index of the image in a list
 * @param isMobile Whether the device is mobile
 * @returns Boolean indicating if the image should be loaded with priority
 */
export function shouldPrioritize(index: number, isMobile: boolean): boolean {
  if (isMobile) {
    // On mobile, only prioritize the first 2 images
    return index < 2;
  } else {
    // On desktop, prioritize the first 4 images
    return index < 4;
  }
}

/**
 * Get appropriate image quality based on device and importance
 * @param isMobile Whether the device is mobile
 * @param isImportant Whether the image is important (e.g. hero image)
 * @returns Quality value for Next.js Image component
 */
export function getImageQuality(isMobile: boolean, isImportant: boolean = false): number {
  if (isMobile) {
    return isImportant ? 80 : 65;
  } else {
    return isImportant ? 90 : 75;
  }
} 