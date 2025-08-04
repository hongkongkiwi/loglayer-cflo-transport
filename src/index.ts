import { BaseTransport, LogLevel } from '@loglayer/transport';
import type { LogLayerTransportParams } from '@loglayer/transport';

/**
 * Interface representing a cflo logger instance that this transport will use
 * to output log messages. Must implement all standard cflo logging methods.
 */
export interface CfloLogger {
  /** Log debug-level messages */
  debug(...args: any[]): void;
  /** Log info-level messages */
  info(...args: any[]): void;
  /** Log general messages */
  log(...args: any[]): void;
  /** Log warning messages */
  warn(...args: any[]): void;
  /** Log error messages */
  error(...args: any[]): void;
}

/**
 * Configuration options for the CfloTransport
 */
export interface CfloTransportConfig {
  /** The cflo logger instance to send logs to */
  logger: CfloLogger;
  /** 
   * Whether to include LogLayer metadata in the cflo log output
   * @default true
   */
  includeMetadata?: boolean;
}

/**
 * LogLayer transport for cflo - the specialized logging library for Cloudflare Workers.
 * 
 * This transport allows LogLayer to send logs through cflo, enabling you to use
 * LogLayer's powerful routing and plugin system while leveraging cflo's 
 * Cloudflare Workers-optimized logging capabilities.
 * 
 * @example
 * ```typescript
 * import { LogLayer } from 'loglayer';
 * import { CfloTransport } from '@loglayer/cflo-transport';
 * import { createLogger } from 'cflo';
 * 
 * const cfloLogger = createLogger({
 *   level: 'info',
 *   format: 'json'
 * });
 * 
 * const log = new LogLayer({
 *   transport: new CfloTransport({
 *     logger: cfloLogger,
 *     includeMetadata: true
 *   })
 * });
 * 
 * log.withContext({ userId: '123' })
 *    .withMetadata({ requestId: 'req-456' })
 *    .info('User logged in');
 * ```
 */
export class CfloTransport extends BaseTransport<CfloLogger> {
  private readonly includeMetadata: boolean;

  /**
   * Creates a new CfloTransport instance
   * 
   * @param config - Configuration object containing the cflo logger and options
   */
  constructor(config: CfloTransportConfig) {
    super(config);
    this.includeMetadata = config.includeMetadata ?? true;
  }

  /**
   * Ships log messages to the cflo logger instance.
   * 
   * Maps LogLayer log levels to cflo methods:
   * - trace, debug → cflo.debug()
   * - info → cflo.info()
   * - warn → cflo.warn()
   * - error, fatal → cflo.error()
   * - other → cflo.log()
   * 
   * @param params - The log parameters from LogLayer
   * @returns Array of messages that were logged
   */
  shipToLogger({ 
    logLevel, 
    messages, 
    data, 
    hasData 
  }: LogLayerTransportParams): any[] {
    const logMessages = [...messages];
    
    // Include metadata if configured and available
    if (this.includeMetadata && hasData && data) {
      logMessages.push(data);
    }

    // Map LogLayer levels to cflo methods
    switch (logLevel) {
      case LogLevel.trace:
      case LogLevel.debug:
        this.logger.debug(...logMessages);
        break;
      case LogLevel.info:
        this.logger.info(...logMessages);
        break;
      case LogLevel.warn:
        this.logger.warn(...logMessages);
        break;
      case LogLevel.error:
      case LogLevel.fatal:
        this.logger.error(...logMessages);
        break;
      default:
        this.logger.log(...logMessages);
        break;
    }

    return logMessages;
  }
}

export default CfloTransport;