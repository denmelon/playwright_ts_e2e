// ACTION POINT: Consider refactoring this file to use a CartPage class.
// Example:
// class CartPage {
//   constructor(private page: Page) {}
//   async assertProduct(heading: string) { ... }
//   async getSubTotal() { ... }
// }
// Move the functions below into methods of the CartPage class.
// This helps organize actions related to the cart in one place.
import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}
  async assertProduct(heading: string) {
    const productHeading = this.page.getByRole('heading', {
      name: heading
    });
    await expect(productHeading).toBeVisible();
  }

  async getSubTotal() {
    const subTotalWrapper = this.page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subTotal = await subTotalWrapper.textContent();
    return Number(subTotal?.substring(1)); // remove $ sign and convert to number
  }
}

