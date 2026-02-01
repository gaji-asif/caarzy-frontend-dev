/**
 * CDN Assets Configuration
 * Centralized management of all static assets (images, icons, fonts)
 * Currently using LOCAL ASSETS only - CDN config commented out
 */

// const CDN_BASE_URL = import.meta.env.VITE_CDN_URL || '';
// const USE_LOCAL_ASSETS = !CDN_BASE_URL;

/**
 * Helper to get asset path (local or CDN)
 */
// const getAssetPath = (localPath: string, cdnPath: string): string => {
//   return USE_LOCAL_ASSETS ? localPath : cdnPath;
// };

/**
 * Asset URLs - Using LOCAL ASSETS from public/assets/
 * To enable CDN: set VITE_CDN_URL in .env and uncomment getAssetPath logic above
 */
export const ASSETS = {
  // Logos
  logos: {
    main: '/assets/images/logo_green.png',
    icon: '/assets/images/logo-icon.png',
    horizontal: '/assets/images/logo-horizontal.png',
  },

  // Hero & Banner Images
  images: {
    hero: '/assets/images/hero-banner.jpg',
    howItWorks: '/assets/images/how-it-works.jpg',
    whyChoose: '/assets/images/why-choose.jpg',
    notFound: '/assets/images/404.png',
  },

  // Icons
  icons: {
    favicon: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-touch-icon.png',
  },

  // Fonts (if hosting custom fonts)
  fonts: {
    heading: '/assets/fonts/heading-font.woff2',
    body: '/assets/fonts/body-font.woff2',
  },
};

/**
 * Helper function to get asset URL with fallback
 * @param assetPath - Path to asset in ASSETS object (e.g., 'logos.main')
 * @param fallback - Fallback URL if asset URL is empty
 */
export const getAssetUrl = (assetPath: string, fallback?: string): string => {
  const keys = assetPath.split('.');
  let asset: any = ASSETS;

  for (const key of keys) {
    asset = asset?.[key];
  }

  return asset || fallback || '';
};

/**
 * Get CDN base URL (currently commented out)
 */
// export const getCdnBaseUrl = (): string => {
//   return CDN_BASE_URL;
// };

/**
 * Check if CDN is configured (currently disabled)
 */
// export const isCdnConfigured = (): boolean => {
//   return !!CDN_BASE_URL;
// };

/**
 * Check if using local assets (currently always true)
 */
export const isUsingLocalAssets = (): boolean => {
  return true; // Always using local assets for now
};
