/**
 * Configuration interface for YNAB automation
 */
export interface YNABConfig {
  accessToken: string;
  budgetId?: string;
  defaultCurrency: string;
  rateLimit: {
    requestsPerHour: number;
    requestsPerMinute: number;
  };
}

/**
 * Default configuration
 */
export const defaultConfig: Partial<YNABConfig> = {
  defaultCurrency: 'USD',
  rateLimit: {
    requestsPerHour: 200,
    requestsPerMinute: 20
  }
};

/**
 * Load configuration from environment variables
 */
export function loadConfig(): YNABConfig {
  const accessToken = process.env.YNAB_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error('YNAB_ACCESS_TOKEN environment variable is required');
  }

  return {
    accessToken,
    budgetId: process.env.YNAB_BUDGET_ID,
    defaultCurrency: process.env.YNAB_CURRENCY || defaultConfig.defaultCurrency || 'USD',
    rateLimit: defaultConfig.rateLimit || {
      requestsPerHour: 200,
      requestsPerMinute: 20
    }
  };
}
