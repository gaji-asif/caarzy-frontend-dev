/**
 * Hook to use logger in React components
 */

import { useMemo } from 'react';
import { getLogger } from '@/utils/logger';

export const useLogger = (source?: string) => {
  const logger = useMemo(() => {
    const loggerInstance = getLogger();
    
    if (source) {
      return {
        debug: (msg: string, data?: unknown) => loggerInstance.logWithSource('debug', msg, source, data),
        info: (msg: string, data?: unknown) => loggerInstance.logWithSource('info', msg, source, data),
        warn: (msg: string, data?: unknown) => loggerInstance.logWithSource('warn', msg, source, data),
        error: (msg: string, data?: unknown) => loggerInstance.logWithSource('error', msg, source, data),
        exception: (msg: string, error?: Error | unknown) => loggerInstance.exception(msg, error),
      };
    }
    
    return loggerInstance;
  }, [source]);

  return logger;
};
