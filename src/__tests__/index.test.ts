import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LogLevel } from '@loglayer/transport';
import { CfloTransport } from '../index';
import type { CfloLogger, CfloTransportConfig } from '../index';

describe('CfloTransport', () => {
  let mockLogger: CfloLogger;
  let transport: CfloTransport;

  beforeEach(() => {
    mockLogger = {
      debug: vi.fn(),
      info: vi.fn(),
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
  });

  describe('constructor', () => {
    it('should create transport with required config', () => {
      const config: CfloTransportConfig = { logger: mockLogger };
      transport = new CfloTransport(config);
      expect(transport).toBeInstanceOf(CfloTransport);
    });

    it('should set includeMetadata to true by default', () => {
      const config: CfloTransportConfig = { logger: mockLogger };
      transport = new CfloTransport(config);

      transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test'],
        data: { meta: 'data' },
        hasData: true,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('test', { meta: 'data' });
    });

    it('should respect includeMetadata config option', () => {
      const config: CfloTransportConfig = {
        logger: mockLogger,
        includeMetadata: false,
      };
      transport = new CfloTransport(config);

      transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test'],
        data: { meta: 'data' },
        hasData: true,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('test');
    });
  });

  describe('shipToLogger', () => {
    beforeEach(() => {
      transport = new CfloTransport({ logger: mockLogger });
    });

    it('should handle trace level logs', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.trace,
        messages: ['trace message'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.debug).toHaveBeenCalledWith('trace message');
      expect(result).toEqual(['trace message']);
    });

    it('should handle debug level logs', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.debug,
        messages: ['debug message'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.debug).toHaveBeenCalledWith('debug message');
      expect(result).toEqual(['debug message']);
    });

    it('should handle info level logs', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['info message'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('info message');
      expect(result).toEqual(['info message']);
    });

    it('should handle warn level logs', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.warn,
        messages: ['warn message'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.warn).toHaveBeenCalledWith('warn message');
      expect(result).toEqual(['warn message']);
    });

    it('should handle error level logs', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.error,
        messages: ['error message'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.error).toHaveBeenCalledWith('error message');
      expect(result).toEqual(['error message']);
    });

    it('should handle fatal level logs', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.fatal,
        messages: ['fatal message'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.error).toHaveBeenCalledWith('fatal message');
      expect(result).toEqual(['fatal message']);
    });

    it('should handle unknown log levels with log method', () => {
      const result = transport.shipToLogger({
        logLevel: 'unknown' as LogLevel,
        messages: ['unknown message'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.log).toHaveBeenCalledWith('unknown message');
      expect(result).toEqual(['unknown message']);
    });

    it('should handle multiple messages', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['message 1', 'message 2', 'message 3'],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        'message 1',
        'message 2',
        'message 3'
      );
      expect(result).toEqual(['message 1', 'message 2', 'message 3']);
    });

    it('should include metadata when hasData is true and includeMetadata is true', () => {
      const metadata = { requestId: 'req-123', userId: '456' };
      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test message'],
        data: metadata,
        hasData: true,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('test message', metadata);
      expect(result).toEqual(['test message', metadata]);
    });

    it('should not include metadata when hasData is false', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test message'],
        data: { some: 'data' },
        hasData: false,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('test message');
      expect(result).toEqual(['test message']);
    });

    it('should not include metadata when data is undefined', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test message'],
        data: undefined,
        hasData: true,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('test message');
      expect(result).toEqual(['test message']);
    });

    it('should not include metadata when includeMetadata is false', () => {
      transport = new CfloTransport({
        logger: mockLogger,
        includeMetadata: false,
      });

      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test message'],
        data: { meta: 'data' },
        hasData: true,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('test message');
      expect(result).toEqual(['test message']);
    });

    it('should handle complex metadata objects', () => {
      const complexData = {
        user: { id: '123', name: 'John' },
        request: { method: 'GET', path: '/api/users' },
        timestamp: new Date('2023-01-01'),
        nested: {
          deep: {
            value: 'test',
          },
        },
      };

      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['complex log'],
        data: complexData,
        hasData: true,
      });

      expect(mockLogger.info).toHaveBeenCalledWith('complex log', complexData);
      expect(result).toEqual(['complex log', complexData]);
    });

    it('should handle empty messages array', () => {
      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: [],
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.info).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });

    it('should preserve message types (strings, numbers, objects)', () => {
      const messages = ['string', 123, { obj: 'value' }, null, undefined];
      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages,
        data: undefined,
        hasData: false,
      });

      expect(mockLogger.info).toHaveBeenCalledWith(...messages);
      expect(result).toEqual(messages);
    });
  });

  describe('integration with different logger implementations', () => {
    it('should work with logger that has additional methods', () => {
      const extendedLogger = {
        ...mockLogger,
        trace: vi.fn(),
        fatal: vi.fn(),
        child: vi.fn(),
      };

      transport = new CfloTransport({ logger: extendedLogger });

      transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test'],
        data: undefined,
        hasData: false,
      });

      expect(extendedLogger.info).toHaveBeenCalledWith('test');
    });

    it('should handle logger methods that return values', () => {
      const loggerWithReturnValues = {
        debug: vi.fn().mockReturnValue('debug-return'),
        info: vi.fn().mockReturnValue('info-return'),
        log: vi.fn().mockReturnValue('log-return'),
        warn: vi.fn().mockReturnValue('warn-return'),
        error: vi.fn().mockReturnValue('error-return'),
      };

      transport = new CfloTransport({ logger: loggerWithReturnValues });

      const result = transport.shipToLogger({
        logLevel: LogLevel.info,
        messages: ['test'],
        data: undefined,
        hasData: false,
      });

      expect(loggerWithReturnValues.info).toHaveBeenCalledWith('test');
      expect(result).toEqual(['test']);
    });
  });
});
