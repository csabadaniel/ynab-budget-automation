# YNAB Budget Automation

A Node.js TypeScript project to help automate budgeting tasks in YNAB (You Need A Budget).

## Prerequisites

Before you can use this project, you need:

1. **Node.js and npm** - Install from [nodejs.org](https://nodejs.org/)
2. **YNAB Account** - Sign up at [youneedabudget.com](https://www.youneedabudget.com/)
3. **YNAB Personal Access Token** - Get it from [YNAB Developer Settings](https://app.youneedabudget.com/settings/developer)

## Setup

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your YNAB access token:
   ```
   YNAB_ACCESS_TOKEN=your_actual_access_token_here
   YNAB_BUDGET_ID=your_budget_id_here  # Optional
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

## Usage

### Development Mode
Run the application directly with TypeScript:
```bash
npm run dev
```

### Production Mode
Build and run the compiled JavaScript:
```bash
npm run build
npm start
```

### Watch Mode
Automatically rebuild on file changes:
```bash
npm run watch
```

## Features

The current implementation includes:

- **Budget Summary**: View all your budgets, accounts, and categories
- **Account Information**: Display account names and balances
- **Category Overview**: Show budgeted amounts, activity, and balances
- **Error Handling**: Graceful error handling for API issues

## Project Structure

```
ynab-budget/
├── src/
│   └── index.ts          # Main application entry point
├── dist/                 # Compiled JavaScript output
├── .env.example          # Environment variables template
├── .env                  # Your actual environment variables (gitignored)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled application
- `npm run dev` - Run with ts-node (development)
- `npm run watch` - Watch for changes and rebuild
- `npm run clean` - Remove build output

## YNAB API

This project uses the official YNAB JavaScript library. Key points:

- All monetary values are in milliunits (1 dollar = 1000 milliunits)
- Use `ynab.utils.convertMilliUnitsToCurrencyAmount()` for display
- Use `ynab.utils.convertCurrencyAmountToMilliUnits()` for API updates
- Rate limiting: 200 requests per hour per token

## Getting Your YNAB Access Token

1. Go to [YNAB Developer Settings](https://app.youneedabudget.com/settings/developer)
2. Click "New Token"
3. Copy the generated token
4. Add it to your `.env` file

## Next Steps

Now that you have the basic setup, you can extend this project to:

- Auto-categorize transactions
- Set up recurring budget allocations
- Generate spending reports
- Import transactions from bank files
- Send budget alerts and notifications
- Integrate with other financial tools

## Troubleshooting

### "Cannot find module 'ynab'" error
Make sure you've installed dependencies:
```bash
npm install
```

### "YNAB_ACCESS_TOKEN environment variable is required" error
1. Copy `.env.example` to `.env`
2. Add your actual YNAB access token to the `.env` file

### TypeScript compilation errors
Make sure TypeScript is installed:
```bash
npm install -g typescript
# or use the local version
npx tsc --version
```

## Contributing

Feel free to add more automation features! Some ideas:
- Transaction categorization rules
- Budget reallocation logic
- Spending analysis tools
- Integration with bank APIs
- Mobile notifications

## License

MIT License
