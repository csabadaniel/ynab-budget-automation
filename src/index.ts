import * as ynab from 'ynab';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class YNABAutomation {
  private api: ynab.API;
  private budgetId: string;

  constructor() {
    const accessToken = process.env.YNAB_ACCESS_TOKEN;
    
    if (!accessToken) {
      throw new Error('YNAB_ACCESS_TOKEN environment variable is required');
    }

    this.api = new ynab.API(accessToken);
    this.budgetId = process.env.YNAB_BUDGET_ID || '';
  }

  /**
   * Get all budgets available to the user
   */
  async getBudgets(): Promise<ynab.BudgetSummary[]> {
    try {
      const budgetsResponse = await this.api.budgets.getBudgets();
      return budgetsResponse.data.budgets;
    } catch (error) {
      console.error('Error fetching budgets:', error);
      throw error;
    }
  }

  /**
   * Get budget details by ID
   */
  async getBudgetDetails(budgetId?: string): Promise<ynab.BudgetDetail> {
    try {
      const targetBudgetId = budgetId || this.budgetId;
      if (!targetBudgetId) {
        throw new Error('Budget ID is required');
      }

      const budgetResponse = await this.api.budgets.getBudgetById(targetBudgetId);
      return budgetResponse.data.budget;
    } catch (error) {
      console.error('Error fetching budget details:', error);
      throw error;
    }
  }

  /**
   * Get all accounts for the budget
   */
  async getAccounts(budgetId?: string): Promise<ynab.Account[]> {
    try {
      const targetBudgetId = budgetId || this.budgetId;
      if (!targetBudgetId) {
        throw new Error('Budget ID is required');
      }

      const accountsResponse = await this.api.accounts.getAccounts(targetBudgetId);
      return accountsResponse.data.accounts;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }

  /**
   * Get all categories for the budget
   */
  async getCategories(budgetId?: string): Promise<ynab.CategoryGroupWithCategories[]> {
    try {
      const targetBudgetId = budgetId || this.budgetId;
      if (!targetBudgetId) {
        throw new Error('Budget ID is required');
      }

      const categoriesResponse = await this.api.categories.getCategories(targetBudgetId);
      return categoriesResponse.data.category_groups;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Example automation: Log budget summary
   */
  async logBudgetSummary(): Promise<void> {
    try {
      console.log('🔍 Fetching YNAB budget information...\n');

      // Get budgets
      const budgets = await this.getBudgets();
      console.log(`📊 Found ${budgets.length} budget(s):`);
      budgets.forEach(budget => {
        console.log(`  - ${budget.name} (${budget.id})`);
      });
      console.log();

      // If we have a specific budget ID, get details
      if (this.budgetId) {
        const budgetDetails = await this.getBudgetDetails();
        console.log(`💰 Budget: ${budgetDetails.name}`);
        console.log(`📅 Last Modified: ${budgetDetails.last_modified_on}`);
        
        // Get accounts
        const accounts = await this.getAccounts();
        console.log(`\n🏦 Accounts (${accounts.length}):`);
        accounts.forEach(account => {
          const balance = ynab.utils.convertMilliUnitsToCurrencyAmount(account.balance);
          console.log(`  - ${account.name}: $${balance}`);
        });

        // Get categories
        const categoryGroups = await this.getCategories();
        console.log(`\n📝 Category Groups (${categoryGroups.length}):`);
        categoryGroups.forEach(group => {
          console.log(`  📁 ${group.name}:`);
          group.categories.forEach(category => {
            const budgeted = ynab.utils.convertMilliUnitsToCurrencyAmount(category.budgeted);
            const activity = ynab.utils.convertMilliUnitsToCurrencyAmount(category.activity);
            const balance = ynab.utils.convertMilliUnitsToCurrencyAmount(category.balance);
            console.log(`    - ${category.name}: Budgeted: $${budgeted}, Activity: $${activity}, Balance: $${balance}`);
          });
        });
      }
    } catch (error) {
      console.error('❌ Error in budget summary:', error);
    }
  }
}

// Main execution
async function main() {
  try {
    const automation = new YNABAutomation();
    await automation.logBudgetSummary();
  } catch (error) {
    console.error('❌ Failed to initialize YNAB automation:', error);
    console.log('\n💡 Make sure to:');
    console.log('1. Set your YNAB_ACCESS_TOKEN in the .env file');
    console.log('2. Optionally set YNAB_BUDGET_ID for a specific budget');
    console.log('3. Get your access token from: https://app.youneedabudget.com/settings/developer');
  }
}

// Run the automation if this file is executed directly
if (require.main === module) {
  main();
}

export { YNABAutomation };
