# Security Policy

## Supported Versions

We support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

### For Non-Critical Issues
- Open an issue on GitHub with the "security" label
- Include steps to reproduce the vulnerability
- Describe the potential impact

### For Critical Security Issues
- **DO NOT** open a public issue
- Email the maintainers directly (if available)
- Or create a private security advisory on GitHub

### What to Include
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact and severity
- Any suggested fixes or mitigations

## Security Considerations

### API Token Security
- **Never commit your YNAB access token** to version control
- Use environment variables (`.env` file) for sensitive data
- Regularly rotate your YNAB access tokens
- Be cautious when sharing logs or debug output

### YNAB API Rate Limits
- This project respects YNAB's rate limits (200 requests/hour)
- Excessive API calls may result in temporary blocks
- Always handle API errors gracefully

### Data Handling
- This project only reads data from YNAB by default
- Any write operations should be carefully reviewed
- Personal financial data should never be logged or exposed

### Dependencies
- Keep dependencies up to date
- Regularly run `npm audit` to check for vulnerabilities
- Review dependency changes before updating

## Best Practices

1. **Environment Variables**
   - Always use `.env` files for sensitive configuration
   - Never commit `.env` files to version control
   - Use `.env.example` for templates

2. **Error Handling**
   - Don't expose sensitive information in error messages
   - Log errors appropriately without revealing tokens
   - Handle API failures gracefully

3. **Code Quality**
   - Follow TypeScript best practices
   - Use proper type checking
   - Validate all inputs and outputs

## Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Resolution**: Varies based on severity and complexity

Thank you for helping keep this project and its users safe!
