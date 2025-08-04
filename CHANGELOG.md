# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-08-04

### Added
- Initial release of @loglayer/cflo-transport
- CfloTransport class extending BaseTransport
- Support for all LogLayer log levels (trace, debug, info, warn, error, fatal)
- Configurable metadata inclusion
- Comprehensive test suite with 20+ test cases
- TypeScript support with full type definitions
- JSDoc documentation throughout the codebase
- ESLint and Prettier configuration for code quality
- GitHub Actions CI/CD pipeline
- Automated NPM publishing workflow
- Coverage reporting with Codecov integration
- Comprehensive README with usage examples
- MIT license

### Features
- ✅ Full LogLayer integration with cflo
- ✅ Supports all cflo log levels (debug, info, log, warn, error)
- ✅ Metadata and context support
- ✅ TypeScript support with comprehensive interfaces
- ✅ Optimized for Cloudflare Workers
- ✅ Error handling with stack trace preservation
- ✅ Configurable metadata inclusion
- ✅ Production-ready with comprehensive testing

### Log Level Mapping
- `trace`, `debug` → `cflo.debug()`
- `info` → `cflo.info()`
- `warn` → `cflo.warn()`
- `error`, `fatal` → `cflo.error()`
- Other levels → `cflo.log()`