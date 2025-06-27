# Contributing to YNAB Budget Automation

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. **Search existing issues** to see if it's already been reported
2. **Create a new issue** with a clear title and description
3. **Include steps to reproduce** for bugs
4. **Add relevant labels** (bug, enhancement, etc.)

### Submitting Changes

1. **Fork the repository** on GitHub
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the coding guidelines below
4. **Test your changes** thoroughly
5. **Commit your changes** with descriptive commit messages
6. **Push to your branch** and submit a pull request

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env`
4. Add your YNAB access token to `.env`
5. Run in development mode: `npm run dev`

## Coding Guidelines

### TypeScript Style

- Use TypeScript for all source code
- Follow the existing code style and patterns
- Use proper TypeScript types from the YNAB library
- Include JSDoc comments for all public methods
- Use async/await for asynchronous operations

### YNAB API Best Practices

- Handle YNAB API rate limits (200 requests/hour)
- All monetary values are in milliunits (multiply by 1000)
- Use `ynab.utils.convertMilliUnitsToCurrencyAmount()` for display
- Use `ynab.utils.convertCurrencyAmountToMilliUnits()` for API calls
- Always handle potential null values from the API
- Follow YNAB's REST API conventions

### Code Quality

- Write clear, self-documenting code
- Add tests for new functionality
- Handle errors gracefully with proper logging
- Use environment variables for configuration
- Follow functional programming patterns where appropriate

## Project Structure

```
src/
├── config.ts     # Configuration and environment setup
├── index.ts      # Main application entry point
└── utils.ts      # Utility functions and helpers
```

## Pull Request Process

1. **Update documentation** if you change functionality
2. **Add tests** for new features
3. **Ensure all tests pass**: `npm test` (when available)
4. **Build successfully**: `npm run build`
5. **Update README.md** with details of changes if needed
6. **Request review** from project maintainers

## Feature Ideas

Here are some features that would be great additions:

- **Transaction Management**
  - Auto-categorize transactions based on rules
  - Import transactions from bank CSV files
  - Duplicate transaction detection

- **Budget Automation**
  - Automatic budget allocation based on income
  - Recurring budget adjustments
  - Goal-based savings automation

- **Reporting & Analytics**
  - Spending trend analysis
  - Budget vs actual reporting
  - Custom spending categories analysis

- **Notifications & Alerts**
  - Budget overspend alerts
  - Goal achievement notifications
  - Monthly spending summaries

- **Integrations**
  - Bank API connections
  - Email/SMS notifications
  - Webhook support for external systems

## Questions?

Feel free to open an issue for any questions about contributing!

## Code of Conduct

This project follows a standard code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Maintain a professional and friendly environment
