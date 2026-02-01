/**
 * Logging Utility
 * Provides structured logging with different log levels
 * Configured via environment variables
 * Includes log storage and 30-day retention policy
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'exception';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
  source?: string;
}

const LOG_STORAGE_KEY = 'app_logs';
const LOG_RETENTION_DAYS = 30;
const LOG_MAX_ENTRIES = 1000;

class Logger {
  private logLevel: number;
  private isDevelopment: boolean;
  private logLevels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    exception: 4,
  };

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    const envLogLevel = (import.meta.env.VITE_LOG_LEVEL || 'info') as LogLevel;
    this.logLevel = this.logLevels[envLogLevel] || this.logLevels.info;
    
    // Initialize storage and prune old logs on startup
    this.initializeStorage();
  }

  /**
   * Initialize storage and perform cleanup
   */
  private initializeStorage(): void {
    if (typeof window === 'undefined') return; // Skip on server-side
    
    try {
      // Create storage if doesn't exist
      if (!localStorage.getItem(LOG_STORAGE_KEY)) {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify([]));
      }
      
      // Prune old logs on initialization
      this.pruneOldLogs();
    } catch (error) {
      console.error('Failed to initialize logger storage:', error);
    }
  }

  /**
   * Get stored logs from localStorage
   */
  private getStoredLogs(): LogEntry[] {
    try {
      if (typeof window === 'undefined') return [];
      
      const logsStr = localStorage.getItem(LOG_STORAGE_KEY);
      return logsStr ? JSON.parse(logsStr) : [];
    } catch (error) {
      console.error('Failed to retrieve logs from storage:', error);
      return [];
    }
  }

  /**
   * Save logs to localStorage
   */
  private saveLogsToStorage(logs: LogEntry[]): void {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to save logs to storage:', error);
    }
  }

  /**
   * Remove logs older than 30 days and limit total entries
   */
  private pruneOldLogs(): void {
    try {
      const logs = this.getStoredLogs();
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000);

      // Filter logs within retention period
      const recentLogs = logs.filter((log) => {
        const logTime = new Date(log.timestamp);
        return logTime > thirtyDaysAgo;
      });

      // Limit to max entries to prevent storage overflow
      const limitedLogs = recentLogs.slice(-LOG_MAX_ENTRIES);

      this.saveLogsToStorage(limitedLogs);
    } catch (error) {
      console.error('Failed to prune old logs:', error);
    }
  }

  /**
   * Get color for console output based on log level
   */
  private getColor(level: LogLevel): string {
    const colors: Record<LogLevel, string> = {
      debug: '\x1b[36m',     // Cyan
      info: '\x1b[32m',      // Green
      warn: '\x1b[33m',      // Yellow
      error: '\x1b[31m',     // Red
      exception: '\x1b[35m', // Magenta
    };
    return colors[level];
  }

  /**
   * Get emoji for log level
   */
  private getEmoji(level: LogLevel): string {
    const emojis: Record<LogLevel, string> = {
      debug: '🐛',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
      exception: '💥',
    };
    return emojis[level];
  }

  /**
   * Format log entry
   */
  private formatMessage(entry: LogEntry): string {
    const emoji = this.getEmoji(entry.level);
    const timestamp = entry.timestamp;
    const source = entry.source ? ` [${entry.source}]` : '';
    return `${emoji} [${timestamp}]${source} ${entry.message}`;
  }

  /**
   * Log to console
   */
  private logToConsole(entry: LogEntry): void {
    const color = this.getColor(entry.level);
    const reset = '\x1b[0m';
    const message = this.formatMessage(entry);

    if (entry.data !== undefined) {
      console.log(`${color}${message}${reset}`, entry.data);
    } else {
      console.log(`${color}${message}${reset}`);
    }
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: unknown, source?: string): void {
    // Check if this log level should be displayed
    if (this.logLevels[level] < this.logLevel) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      source: source || this.getCallerInfo(),
    };

    // Log to console in development
    if (this.isDevelopment) {
      this.logToConsole(entry);
    }

    // Store log entry
    this.storeLog(entry);

    // TODO: Send to logging service in production
    // if (!this.isDevelopment) {
    //   this.sendToLoggingService(entry);
    // }
  }

  /**
   * Store log entry in localStorage
   */
  private storeLog(entry: LogEntry): void {
    try {
      const logs = this.getStoredLogs();
      logs.push(entry);
      this.saveLogsToStorage(logs);
      
      // Prune on every 10th log to avoid performance overhead
      if (logs.length % 10 === 0) {
        this.pruneOldLogs();
      }
    } catch (error) {
      console.error('Failed to store log:', error);
    }
  }

  /**
   * Get caller information
   */
  private getCallerInfo(): string | undefined {
    if (!this.isDevelopment) return undefined;

    const error = new Error();
    const stack = error.stack?.split('\n') || [];
    // Return file:line info from stack trace
    const callerLine = stack[3] || '';
    const match = callerLine.match(/\((.+):(\d+):\d+\)|at (.+):(\d+):\d+/);
    if (match) {
      const file = match[1] || match[3];
      const line = match[2] || match[4];
      return `${file.split('/').pop()}:${line}`;
    }
    return undefined;
  }

  /**
   * Debug level logging
   */
  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  /**
   * Info level logging
   */
  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  /**
   * Warn level logging
   */
  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  /**
   * Error level logging
   */
  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  /**
   * Exception logging
   */
  exception(message: string, error?: Error | unknown): void {
    const errorData = error instanceof Error 
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : error;
    
    this.log('exception', message, errorData);
  }

  /**
   * Log with custom source
   */
  logWithSource(level: LogLevel, message: string, source: string, data?: unknown): void {
    this.log(level, message, data, source);
  }

  /**
   * Get all stored logs
   */
  getLogs(): LogEntry[] {
    return this.getStoredLogs();
  }

  /**
   * Get logs filtered by level
   */
  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.getStoredLogs().filter((log) => log.level === level);
  }

  /**
   * Get logs from the last N days
   */
  getRecentLogs(days: number = 1): LogEntry[] {
    const logs = this.getStoredLogs();
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return logs.filter((log) => new Date(log.timestamp) > cutoffDate);
  }

  /**
   * Clear all stored logs
   */
  clearLogs(): void {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.removeItem(LOG_STORAGE_KEY);
      console.log('📋 All logs cleared');
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  }

  /**
   * Export logs as JSON string
   */
  exportLogsAsJSON(): string {
    const logs = this.getStoredLogs();
    return JSON.stringify(logs, null, 2);
  }

  /**
   * Export logs as CSV string
   */
  exportLogsAsCSV(): string {
    const logs = this.getStoredLogs();
    const headers = ['Timestamp', 'Level', 'Source', 'Message', 'Data'];
    const rows = logs.map((log) => [
      log.timestamp,
      log.level.toUpperCase(),
      log.source || '',
      log.message,
      log.data ? JSON.stringify(log.data) : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    return csvContent;
  }

  /**
   * Get logger statistics
   */
  getStats(): Record<string, number | string | null> {
    const logs = this.getStoredLogs();
    const stats = {
      total: logs.length,
      debug: logs.filter((l) => l.level === 'debug').length,
      info: logs.filter((l) => l.level === 'info').length,
      warn: logs.filter((l) => l.level === 'warn').length,
      error: logs.filter((l) => l.level === 'error').length,
      exception: logs.filter((l) => l.level === 'exception').length,
      oldestLog: logs.length > 0 ? logs[0].timestamp : null,
      newestLog: logs.length > 0 ? logs[logs.length - 1].timestamp : null,
    };
    return stats;
  }

  /**
   * Manually trigger log pruning
   */
  pruneLogs(): void {
    this.pruneOldLogs();
  }
}

// Create singleton instance
const loggerInstance = new Logger();

/**
 * Get logger instance
 */
export function getLogger(): Logger {
  return loggerInstance;
}

/**
 * Convenience exports
 */
export const log = {
  debug: (msg: string, data?: unknown) => loggerInstance.debug(msg, data),
  info: (msg: string, data?: unknown) => loggerInstance.info(msg, data),
  warn: (msg: string, data?: unknown) => loggerInstance.warn(msg, data),
  error: (msg: string, data?: unknown) => loggerInstance.error(msg, data),
  exception: (msg: string, error?: Error | unknown) => loggerInstance.exception(msg, error),
  getLogs: () => loggerInstance.getLogs(),
  getLogsByLevel: (level: LogLevel) => loggerInstance.getLogsByLevel(level),
  getRecentLogs: (days?: number) => loggerInstance.getRecentLogs(days),
  clearLogs: () => loggerInstance.clearLogs(),
  exportAsJSON: () => loggerInstance.exportLogsAsJSON(),
  exportAsCSV: () => loggerInstance.exportLogsAsCSV(),
  getStats: () => loggerInstance.getStats(),
  pruneLogs: () => loggerInstance.pruneLogs(),
};

export default loggerInstance;
