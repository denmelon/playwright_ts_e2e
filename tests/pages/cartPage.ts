// cartPage.ts
// Page Object Model for Valentino's Magic Beans Cart Page
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  async updateQuantityInCart(productName: string, newQuantity: number) {
    // Find the cart item for the product
    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    // Find the cart item with a data-test-id containing the slug
    const cartItemWithSlug = this.page.locator(`[data-test-id*="${slug}"]`).filter({ has: this.page.getByRole('heading', { name: productName }) });
    const cartItem = (await cartItemWithSlug.count() > 0) ? cartItemWithSlug.first() : this.page.getByRole('heading', { name: productName }).locator('..').locator('..');

    // Find the plus button for this product
    // The plus button should have a data-test-id like quantity-increase-<id>-<slug>, only within this cart item
    // Find the product id from the cart item's button data-test-id
      // Always re-query the cart item and plus button to avoid stale locators
      let currentQty = 1;
      while (currentQty < newQuantity) {
        // Find the cart item for the product
        const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const cartItemWithSlug = this.page.locator(`[data-test-id*="${slug}"]`).filter({ has: this.page.getByRole('heading', { name: productName }) });
        const cartItem = (await cartItemWithSlug.count() > 0) ? cartItemWithSlug.first() : this.page.getByRole('heading', { name: productName }).locator('..').locator('..');
        // Find the product id from the cart item's button data-test-id
        const allButtons = cartItem.locator('button');
        let productId = '';
        const btnCount = await allButtons.count();
        for (let i = 0; i < btnCount; i++) {
          const btn = allButtons.nth(i);
          const dataTestId = await btn.getAttribute('data-test-id');
          if (dataTestId && dataTestId.startsWith('quantity-increase-')) {
            productId = dataTestId.replace('quantity-increase-', '');
          }
        }
        if (!productId) {
          throw new Error(`Product id not found for plus button for product: ${productName}`);
        }
        const plusButton = cartItem.locator(`[data-test-id="quantity-increase-${productId}"]`);
        if ((await plusButton.count()) === 0) {
          throw new Error(`Plus button not found for product: ${productName}`);
        }
        const qtyDisplay = cartItem.locator('text=/^\\d+$/');
        if (await qtyDisplay.count() > 0) {
          currentQty = parseInt(await qtyDisplay.first().textContent() || '1', 10);
        }
        if (currentQty < newQuantity) {
          const btn = plusButton.first();
          const isVisible = await btn.isVisible();
          const isEnabled = await btn.isEnabled();
          if (isVisible && isEnabled) {
            await btn.click();
            await this.page.waitForTimeout(200);
            if (await qtyDisplay.count() > 0) {
              const newQty = parseInt(await qtyDisplay.first().textContent() || '1', 10);
              if (newQty > currentQty) {
                currentQty = newQty;
              } else {
                break;
              }
            }
          } else {
            break;
          }
        }
      }
  }
  async removeItemFromCart(productName: string) {
    // Find the cart item by heading and click its remove button (assume button with trash icon or 'Remove')
    const itemHeading = this.page.getByRole('heading', { name: productName });
    // Try to find a remove button near the heading
  // Traverse up to the cart item container (2 levels up)
  const cartItem = itemHeading.locator('..').locator('..');
    // Try labeled button first
    const removeButton = cartItem.getByRole('button', { name: /remove|delete|trash/i });
    if (await removeButton.count() > 0) {
      await removeButton.first().click();
      return;
    }
    // Try generic trash icon button
    const trashButton = cartItem.locator('button[aria-label*="remove"], button[aria-label*="delete"], button[title*="remove"], button[title*="delete"]');
    if (await trashButton.count() > 0) {
      await trashButton.first().click();
      return;
    }
    // Fallback: click the last enabled button in the cart item (skip disabled)
    const allButtons = cartItem.locator('button:not([disabled])');
    const count = await allButtons.count();
    if (count > 0) {
      await allButtons.nth(count - 1).click();
      return;
    }
    throw new Error('Remove button not found for product: ' + productName);
  }
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('main h3, [ref="e36"]');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.emptyCartMessage = page.locator('text=Your cart is empty');
  }

  async goto() {
    await this.page.goto('https://valentinos-magic-beans.click/cart');
  }

  async assertProduct(heading: string) {
    const productHeading = this.page.getByRole('heading', { name: heading });
    await expect(productHeading).toBeVisible();
  }

  async getSubTotal() {
    const subTotalWrapper = this.page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subTotal = await subTotalWrapper.textContent();
    return Number(subTotal?.replace(/[^\d.]/g, ''));
  }
}
