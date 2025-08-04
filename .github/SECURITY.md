# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do NOT** open a public issue
Security vulnerabilities should not be reported through public GitHub issues.

### 2. Report privately
Send an email to the maintainers with:
- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (if available)

### 3. Response timeline
- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity (critical issues prioritized)

## Security Measures

This project implements several security measures:

### Automated Security
- 🤖 **Dependabot**: Automatic dependency updates for security vulnerabilities
- 🔍 **NPM Audit**: Regular security audits in CI/CD pipeline
- ✅ **Status checks**: All PRs require security checks to pass

### Code Quality
- 🧪 **Comprehensive testing**: 20+ test cases covering edge cases
- 📝 **Code review**: All changes require approval
- 🔒 **Branch protection**: Main branch protected against direct pushes

### Dependency Management
- 📦 **Minimal dependencies**: Only essential peer dependencies
- 🔄 **Regular updates**: Automated security and version updates
- 🛡️ **Audit level**: Moderate security vulnerabilities blocked

## Security Best Practices

When using this transport:

### 1. Keep Dependencies Updated
```bash
npm audit
npm update
```

### 2. Use Official Releases
Only use official releases from NPM:
```bash
npm install @loglayer/cflo-transport
```

### 3. Validate Inputs
While this transport handles LogLayer data, ensure your application validates user inputs before logging.

### 4. Secure Configuration
```typescript
// ✅ Good: No sensitive data in logs
log.info('User logged in', { userId: user.id });

// ❌ Avoid: Sensitive data in logs
log.info('User logged in', { password: user.password });
```

## Vulnerability Disclosure

We believe in responsible disclosure. If you report a security vulnerability:

1. **We will acknowledge** your report within 48 hours
2. **We will investigate** and confirm the vulnerability
3. **We will develop** a fix and timeline for release
4. **We will notify you** when the fix is released
5. **We will credit you** (if desired) in the security advisory

## Security Contact

For security-related inquiries, please contact the maintainers directly rather than using public channels.

## Legal

This security policy is subject to change. By using this software, you agree to follow responsible disclosure practices.