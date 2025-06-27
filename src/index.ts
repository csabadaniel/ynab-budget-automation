import * as ynab from 'ynab';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

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
   * Save budget summary to JSON file
   */
  async logBudgetSummary(): Promise<void> {
    try {
      console.log('🔍 Fetching YNAB budget information...\n');

      // Get budgets
      const budgets = await this.getBudgets();
      console.log(`📊 Found ${budgets.length} budget(s)`);

      const budgetData: any = {
        timestamp: new Date().toISOString(),
        budgets: budgets.map(budget => ({
          id: budget.id,
          name: budget.name,
          last_modified_on: budget.last_modified_on,
          first_month: budget.first_month,
          last_month: budget.last_month
        }))
      };

      // If we have a specific budget ID, get detailed data
      if (this.budgetId) {
        console.log(`💰 Getting details for budget: ${this.budgetId}`);
        
        const budgetDetails = await this.getBudgetDetails();
        const accounts = await this.getAccounts();
        const categoryGroups = await this.getCategories();

        budgetData.budget_details = {
          id: budgetDetails.id,
          name: budgetDetails.name,
          last_modified_on: budgetDetails.last_modified_on,
          first_month: budgetDetails.first_month,
          last_month: budgetDetails.last_month,
          date_format: budgetDetails.date_format,
          currency_format: budgetDetails.currency_format
        };

        budgetData.accounts = accounts.map(account => ({
          id: account.id,
          name: account.name,
          type: account.type,
          on_budget: account.on_budget,
          closed: account.closed,
          note: account.note,
          balance: account.balance,
          balance_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(account.balance),
          cleared_balance: account.cleared_balance,
          uncleared_balance: account.uncleared_balance,
          transfer_payee_id: account.transfer_payee_id,
          direct_import_linked: account.direct_import_linked,
          direct_import_in_error: account.direct_import_in_error,
          last_reconciled_at: account.last_reconciled_at
        }));

        budgetData.category_groups = categoryGroups.map(group => ({
          id: group.id,
          name: group.name,
          hidden: group.hidden,
          deleted: group.deleted,
          categories: group.categories.map(category => ({
            id: category.id,
            category_group_id: category.category_group_id,
            name: category.name,
            hidden: category.hidden,
            original_category_group_id: category.original_category_group_id,
            note: category.note,
            budgeted: category.budgeted,
            budgeted_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(category.budgeted),
            activity: category.activity,
            activity_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(category.activity),
            balance: category.balance,
            balance_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(category.balance),
            goal_type: category.goal_type,
            goal_day: category.goal_day,
            goal_cadence: category.goal_cadence,
            goal_cadence_frequency: category.goal_cadence_frequency,
            goal_creation_month: category.goal_creation_month,
            goal_target: category.goal_target,
            goal_target_month: category.goal_target_month,
            goal_percentage_complete: category.goal_percentage_complete,
            goal_months_to_budget: category.goal_months_to_budget,
            goal_under_funded: category.goal_under_funded,
            goal_overall_funded: category.goal_overall_funded,
            goal_overall_left: category.goal_overall_left,
            deleted: category.deleted
          }))
        }));
      } else if (budgets.length > 0) {
        // If no specific budget ID, use the first budget
        console.log(`💰 No specific budget ID set, using first budget: ${budgets[0].name}`);
        this.budgetId = budgets[0].id;
        
        const budgetDetails = await this.getBudgetDetails();
        const accounts = await this.getAccounts();
        const categoryGroups = await this.getCategories();

        budgetData.budget_details = {
          id: budgetDetails.id,
          name: budgetDetails.name,
          last_modified_on: budgetDetails.last_modified_on,
          first_month: budgetDetails.first_month,
          last_month: budgetDetails.last_month,
          date_format: budgetDetails.date_format,
          currency_format: budgetDetails.currency_format
        };

        budgetData.accounts = accounts.map(account => ({
          id: account.id,
          name: account.name,
          type: account.type,
          on_budget: account.on_budget,
          closed: account.closed,
          note: account.note,
          balance: account.balance,
          balance_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(account.balance),
          cleared_balance: account.cleared_balance,
          uncleared_balance: account.uncleared_balance,
          transfer_payee_id: account.transfer_payee_id,
          direct_import_linked: account.direct_import_linked,
          direct_import_in_error: account.direct_import_in_error,
          last_reconciled_at: account.last_reconciled_at
        }));

        budgetData.category_groups = categoryGroups.map(group => ({
          id: group.id,
          name: group.name,
          hidden: group.hidden,
          deleted: group.deleted,
          categories: group.categories.map(category => ({
            id: category.id,
            category_group_id: category.category_group_id,
            name: category.name,
            hidden: category.hidden,
            original_category_group_id: category.original_category_group_id,
            note: category.note,
            budgeted: category.budgeted,
            budgeted_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(category.budgeted),
            activity: category.activity,
            activity_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(category.activity),
            balance: category.balance,
            balance_formatted: ynab.utils.convertMilliUnitsToCurrencyAmount(category.balance),
            goal_type: category.goal_type,
            goal_day: category.goal_day,
            goal_cadence: category.goal_cadence,
            goal_cadence_frequency: category.goal_cadence_frequency,
            goal_creation_month: category.goal_creation_month,
            goal_target: category.goal_target,
            goal_target_month: category.goal_target_month,
            goal_percentage_complete: category.goal_percentage_complete,
            goal_months_to_budget: category.goal_months_to_budget,
            goal_under_funded: category.goal_under_funded,
            goal_overall_funded: category.goal_overall_funded,
            goal_overall_left: category.goal_overall_left,
            deleted: category.deleted
          }))
        }));
      }

      // Create output directory if it doesn't exist
      const outputDir = path.join(process.cwd(), 'output');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `ynab-budget-summary-${timestamp}.json`;
      const filepath = path.join(outputDir, filename);

      // Write to file
      fs.writeFileSync(filepath, JSON.stringify(budgetData, null, 2), 'utf8');
      
      console.log(`✅ Budget summary saved to: ${filepath}`);
      console.log(`📊 Data includes:`);
      console.log(`   - ${budgetData.budgets.length} budget(s)`);
      if (budgetData.accounts) {
        console.log(`   - ${budgetData.accounts.length} account(s)`);
      }
      if (budgetData.category_groups) {
        const totalCategories = budgetData.category_groups.reduce((sum: number, group: any) => sum + group.categories.length, 0);
        console.log(`   - ${budgetData.category_groups.length} category group(s)`);
        console.log(`   - ${totalCategories} categories`);
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
