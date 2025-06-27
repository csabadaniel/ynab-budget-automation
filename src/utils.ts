import * as ynab from 'ynab';

/**
 * Utility functions for YNAB automation
 */
export class YNABUtils {
  /**
   * Convert YNAB milliunits to currency amount for display
   */
  static formatCurrency(milliunits: number): string {
    const amount = ynab.utils.convertMilliUnitsToCurrencyAmount(milliunits);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  /**
   * Convert currency amount to YNAB milliunits for API calls
   * YNAB uses milliunits (1 dollar = 1000 milliunits)
   */
  static toMilliunits(amount: number): number {
    return Math.round(amount * 1000);
  }

  /**
   * Format date for display
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Check if an account is a budget account (not tracking)
   */
  static isBudgetAccount(account: ynab.Account): boolean {
    return account.on_budget;
  }

  /**
   * Filter categories to exclude hidden and deleted ones
   */
  static getActiveCategories(categoryGroups: ynab.CategoryGroupWithCategories[]): ynab.Category[] {
    const activeCategories: ynab.Category[] = [];
    
    categoryGroups.forEach(group => {
      if (!group.hidden && !group.deleted) {
        group.categories.forEach(category => {
          if (!category.hidden && !category.deleted) {
            activeCategories.push(category);
          }
        });
      }
    });

    return activeCategories;
  }

  /**
   * Calculate total budgeted amount across all categories
   */
  static getTotalBudgeted(categoryGroups: ynab.CategoryGroupWithCategories[]): number {
    return this.getActiveCategories(categoryGroups)
      .reduce((total, category) => total + category.budgeted, 0);
  }

  /**
   * Calculate total activity across all categories
   */
  static getTotalActivity(categoryGroups: ynab.CategoryGroupWithCategories[]): number {
    return this.getActiveCategories(categoryGroups)
      .reduce((total, category) => total + category.activity, 0);
  }

  /**
   * Find categories that are overspent
   */
  static getOverspentCategories(categoryGroups: ynab.CategoryGroupWithCategories[]): ynab.Category[] {
    return this.getActiveCategories(categoryGroups)
      .filter(category => category.balance < 0);
  }

  /**
   * Find categories with unassigned money
   */
  static getUnderfundedCategories(categoryGroups: ynab.CategoryGroupWithCategories[]): ynab.Category[] {
    return this.getActiveCategories(categoryGroups)
      .filter(category => category.balance > 0 && category.budgeted === 0);
  }
}
