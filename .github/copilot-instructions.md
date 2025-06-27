<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# YNAB Budget Automation Project

This is a Node.js TypeScript project for automating YNAB (You Need A Budget) tasks.

## Project Guidelines

- Use TypeScript for all source code
- Follow the YNAB API patterns and conventions
- Handle errors gracefully with proper logging
- Use environment variables for configuration
- Follow functional programming patterns where appropriate
- Use proper TypeScript types from the YNAB library
- Include JSDoc comments for all public methods
- Use async/await for asynchronous operations
- Handle YNAB API rate limits and errors appropriately

## YNAB API Specifics

- All monetary values in YNAB are in milliunits (multiply by 1000)
- Use `ynab.utils.convertMilliUnitsToCurrencyAmount()` for display
- Use `ynab.utils.convertCurrencyAmountToMilliUnits()` for API calls
- Always handle potential null values from the API
- Budget IDs and other IDs are UUIDs
- Follow YNAB's REST API conventions

## Dependencies

- `ynab`: Official YNAB JavaScript library
- `dotenv`: Environment variable management
- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions
- `ts-node`: TypeScript execution for development
