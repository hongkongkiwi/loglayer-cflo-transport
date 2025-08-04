# @loglayer/cflo-transport

[![npm version](https://badge.fury.io/js/@loglayer%2Fcflo-transport.svg)](https://badge.fury.io/js/@loglayer%2Fcflo-transport)
[![CI](https://github.com/hongkongkiwi/loglayer-cflo/workflows/CI/badge.svg)](https://github.com/hongkongkiwi/loglayer-cflo/actions)
[![codecov](https://codecov.io/gh/hongkongkiwi/loglayer-cflo/branch/main/graph/badge.svg)](https://codecov.io/gh/hongkongkiwi/loglayer-cflo)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A LogLayer transport for [cflo](https://github.com/gambonny/cflo) - the specialized logging library for Cloudflare Workers.

## Installation

```bash
npm install @loglayer/cflo-transport cflo loglayer
```

## Quick Start

```typescript
import { LogLayer } from 'loglayer';
import { CfloTransport } from '@loglayer/cflo-transport';
import { createLogger } from 'cflo';

// Create a cflo logger instance
const cfloLogger = createLogger({
  level: 'info',
  format: 'json' // or 'pretty'
});

// Create LogLayer with cflo transport
const log = new LogLayer({
  transport: new CfloTransport({
    logger: cfloLogger,
    includeMetadata: true // Include LogLayer metadata in cflo logs
  })
});

// Use LogLayer with cflo as the transport
log.withContext({ userId: '123' })
   .withMetadata({ requestId: 'req-456' })
   .info('User logged in');
```

## Advanced Usage

### Error Logging with Stack Traces

```typescript
try {
  // Some operation that might fail
  throw new Error('Database connection failed');
} catch (error) {
  log.withError(error)
     .withMetadata({ operation: 'database-connect', retryCount: 3 })
     .error('Failed to connect to database');
}
```

### Structured Logging with Context

```typescript
// Set up a logger with persistent context
const requestLogger = log.withContext({
  requestId: 'req-123',
  userId: 'user-456',
  service: 'auth-service'
});

requestLogger.info('Processing authentication request');
requestLogger.withMetadata({ provider: 'oauth' }).info('Using OAuth provider');
requestLogger.warn('Rate limit approaching', { remaining: 10 });
```

### Performance Monitoring

```typescript
const startTime = performance.now();

// Your operation here
await processUserRequest();

const duration = performance.now() - startTime;

log.withMetadata({ 
    operation: 'process-user-request',
    duration,
    performanceMarks: {
      start: startTime,
      end: performance.now()
    }
  })
  .info('Request processed successfully');
```

### Different Log Levels

```typescript
log.debug('Debug information', { debugData: 'detailed info' });
log.info('Application started', { version: '1.0.0' });
log.warn('Deprecated API usage', { api: '/old-endpoint' });
log.error('Validation failed', { field: 'email', value: 'invalid' });
```

## Configuration

### CfloTransportConfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `logger` | `CfloLogger` | **required** | A cflo logger instance |
| `includeMetadata` | `boolean` | `true` | Whether to include LogLayer metadata in the cflo logs |

### Example Configuration

```typescript
const transport = new CfloTransport({
  logger: createLogger({
    level: 'debug',
    format: 'json',
    // cflo-specific options
  }),
  includeMetadata: false // Exclude metadata for cleaner logs
});
```

## Features

- ✅ **Full LogLayer Integration** - Complete compatibility with LogLayer's fluent API
- ✅ **All Log Levels** - Supports debug, info, log, warn, error with proper mapping
- ✅ **Metadata & Context** - Full support for LogLayer's metadata and context features
- ✅ **TypeScript Support** - Fully typed with comprehensive interfaces
- ✅ **Cloudflare Workers Optimized** - Leverages cflo's Cloudflare Workers optimizations
- ✅ **Error Handling** - Proper error object handling and stack trace preservation
- ✅ **Performance** - Minimal overhead with efficient log routing
- ✅ **Flexible Configuration** - Configurable metadata inclusion and cflo options

## Log Level Mapping

LogLayer levels are intelligently mapped to cflo methods:

| LogLayer Level | cflo Method | Description |
|----------------|-------------|-------------|
| `trace`, `debug` | `cflo.debug()` | Debug-level information |
| `info` | `cflo.info()` | General information |
| `warn` | `cflo.warn()` | Warning conditions |
| `error`, `fatal` | `cflo.error()` | Error conditions |
| *other levels* | `cflo.log()` | Fallback for custom levels |

## Why Use This Transport?

### Problem Solved
Cloudflare Workers have limited logging capabilities with no built-in log level filtering. cflo solves this by providing runtime log level filtering and structured logging, while LogLayer adds powerful routing, plugins, and metadata management.

### Benefits
- **Best of Both Worlds**: LogLayer's routing + cflo's Workers optimization
- **Structured Logging**: Rich metadata and context support
- **Developer Experience**: Fluent API with full TypeScript support
- **Production Ready**: Comprehensive testing and CI/CD pipeline
- **Flexible**: Configurable metadata inclusion and log formatting

## API Reference

### CfloLogger Interface

```typescript
interface CfloLogger {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}
```

### CfloTransport Class

```typescript
class CfloTransport extends BaseTransport<CfloLogger> {
  constructor(config: CfloTransportConfig);
  shipToLogger(params: LogLayerTransportParams): any[];
}
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run typecheck

# Development mode (watch)
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests
4. Ensure tests pass (`npm run test:run`)
5. Run linting and type checking (`npm run lint && npm run typecheck`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

MIT © [Andy Savage](https://github.com/hongkongkiwi)

## Related Projects

- [LogLayer](https://github.com/loglayer/loglayer) - Modern logging library with routing and plugins
- [cflo](https://github.com/gambonny/cflo) - Logging library for Cloudflare Workers
- [LogLayer Documentation](https://loglayer.dev) - Complete LogLayer documentation