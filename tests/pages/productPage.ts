// productPage.ts
// Page Object Model for Valentino's Magic Beans Product Details Page
import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly viewDetailsButton: Locator;
  readonly backToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('main h3');
    this.productPrice = page.locator('main [class*=\"price\"], main [ref^=e72], main [ref^=e86], main [ref^=e100]');
    this.addToCartButton = page.locator('button:has-text("Add to Cart")');
    this.viewDetailsButton = page.locator('a:has-text("View Details")');
    this.backToProducts = page.locator('a:has-text("View All Products")');
  }

  async goto(productId: string) {
    await this.page.goto(`https://valentinos-magic-beans.click/products/${productId}`);
  }
}
