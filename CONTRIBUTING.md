# Contributing to @loglayer/cflo-transport

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (we test on 18, 20, 22)
- npm 9+
- Git

### Development Setup
1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/loglayer-cflo.git
   cd loglayer-cflo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests to verify setup**
   ```bash
   npm test
   ```

## 🔄 Development Workflow

### Making Changes
1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following our style guidelines
   - Add tests for new functionality
   - Update documentation as needed

3. **Verify your changes**
   ```bash
   # Run all quality checks
   npm run lint
   npm run typecheck
   npm run test:run
   npm run build
   
   # Or run everything at once
   npm run prepublishOnly
   ```

### Code Style
- **ESLint**: We use ESLint for code linting
- **Prettier**: Code formatting is enforced
- **TypeScript**: Strict mode enabled with comprehensive checks
- **Tests**: All new code must have tests

### Commit Convention
We follow conventional commits:
```
type(scope): description

feat: add new feature
fix: bug fix
docs: documentation changes
test: adding tests
chore: maintenance tasks
ci: CI/CD changes
```

Examples:
- `feat: add metadata filtering option`
- `fix: handle null logger gracefully`
- `docs: update API examples`

## 🧪 Testing

### Running Tests
```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage
```

### Writing Tests
- Place tests in `src/__tests__/`
- Test files should end with `.test.ts`
- Cover both happy path and edge cases
- Use descriptive test names

Example test structure:
```typescript
describe('FeatureName', () => {
  describe('methodName', () => {
    it('should handle normal case', () => {
      // Test implementation
    });
    
    it('should handle edge case', () => {
      // Test implementation
    });
  });
});
```

## 📝 Documentation

### Update Documentation
When making changes, ensure you update:
- **README.md** - If API changes or new examples needed
- **JSDoc comments** - For any new methods or interfaces
- **CHANGELOG.md** - Following semantic versioning
- **Type definitions** - Ensure TypeScript definitions are accurate

### API Documentation
- Use JSDoc for all public methods and interfaces
- Include examples in JSDoc when helpful
- Document parameters, return types, and exceptions

## 🔍 Code Review Process

### Pull Request Guidelines
1. **Fill out the PR template completely**
2. **Ensure all CI checks pass**
3. **Request review from maintainers**
4. **Address feedback promptly**

### Review Criteria
We review for:
- ✅ **Functionality**: Does it work as intended?
- ✅ **Tests**: Are there adequate tests?
- ✅ **Documentation**: Is it properly documented?
- ✅ **Performance**: Any performance implications?
- ✅ **Security**: Any security considerations?
- ✅ **Compatibility**: Maintains backward compatibility?

## 🏷️ Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps
1. Update `CHANGELOG.md`
2. Update version in `package.json`
3. Create git tag: `git tag v1.x.x`
4. Push tag: `git push origin v1.x.x`
5. GitHub Actions will handle the rest

## 🐛 Bug Reports

### Before Reporting
- Check existing issues
- Verify with latest version
- Create minimal reproduction case

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Install version X
2. Use configuration Y
3. Call method Z
4. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- Node.js version: [e.g. 20.x]
- Package version: [e.g. 1.0.0]
- cflo version: [e.g. 1.0.0]
- loglayer version: [e.g. 6.6.0]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Before Requesting
- Check if feature already exists
- Consider if it fits the project scope
- Think about backward compatibility

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Focus on what's best for the community
- Show empathy towards other contributors

### Getting Help
- **Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Security**: Use private security reporting for vulnerabilities

## 🏆 Recognition

Contributors who make significant contributions will be:
- Added to the contributors list
- Mentioned in release notes
- Given appropriate GitHub repository permissions

Thank you for contributing to make this project better! 🎉