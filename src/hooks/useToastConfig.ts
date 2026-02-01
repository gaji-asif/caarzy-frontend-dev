/**
 * Hook to get toast configuration from environment variables
 */
export const useToastConfig = () => {
  const toastDuration = parseInt(
    import.meta.env.VITE_TOAST_DURATION || '3000',
    10
  );

  const toastPosition = (
    import.meta.env.VITE_TOAST_POSITION || 'top-right'
  ) as 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

  return {
    duration: toastDuration,
    position: toastPosition,
  };
};

/**
 * Get toast duration in seconds (for use in toast components)
 */
export const getToastDuration = (): number => {
  const duration = parseInt(
    import.meta.env.VITE_TOAST_DURATION || '3000',
    10
  );
  return Math.floor(duration / 1000);
};

/**
 * Get toast position from environment
 */
export const getToastPosition = (): 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center' => {
  return (
    import.meta.env.VITE_TOAST_POSITION || 'top-right'
  ) as 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
};
