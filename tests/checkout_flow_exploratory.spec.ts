// checkout_flow_exploratory.spec.ts
// Exploratory tests for checkout flow using CheckoutPage
import { test, expect } from '@playwright/test';
import { CheckoutPage, testValues } from './pages/checkout';
import { CartPage } from './pages/cartPage';

test.describe('Checkout Flow - Exploratory', () => {
  let checkoutPage: CheckoutPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    // Add a product to cart first
    await page.goto('https://valentinos-magic-beans.click/');
    await page.locator('a:has-text("View Details")').first().click();
    await page.locator('button:has-text("Add to Cart")').click();
    await page.locator('a[href="/cart"]').click();
    await expect(cartPage.cartItems.first()).toBeVisible();
    // Go to checkout
    await page.locator('a:has-text("Proceed to Checkout")').click();
  });

  test('should display required fields and show errors if empty', async ({ page }) => {
    // Try to place order without filling fields
  await checkoutPage.placeOrder();
  await expect(page.getByText('First name is required.')).toBeVisible();
  });

  test('should fill all fields and (simulate) place order', async ({ page }) => {
    await checkoutPage.addContactInfo();
    await checkoutPage.addShippingAddress();
    await checkoutPage.addPaymentInformation();
    // Do not actually place order to avoid real transaction
    await expect(page.locator('[data-test-id="place-order-button"]')).toBeVisible();
  });
});
