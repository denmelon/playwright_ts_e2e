// product_flow_exploratory.spec.ts
// Exploratory tests for product details and cart flow
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { ProductPage } from './pages/productPage';
import { CartPage } from './pages/cartPage';
import { ProductsPage } from './pages/products';

test.describe('Product Details and Cart Flow - Exploratory', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
  productsPage = new ProductsPage(page);
  await homePage.goto();
  });

  test('should navigate to a product details page from home', async ({ page }) => {
  // Click first 'View Details' button
  await page.locator('a:has-text("View Details")').first().click();
  await expect(productPage.productTitle.first()).toBeVisible();
  await expect(productPage.addToCartButton).toBeVisible();
  });

  test('should add a product to cart and see it in cart', async ({ page }) => {
    // Add product to cart from product listing (index 1)
    await page.goto('/products');
    const addedProduct = await productsPage.addProductToCart(1);
    // Open cart via header cart button
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
    // Assert product is in cart by name
    await cartPage.assertProduct(addedProduct.name!);
    await expect(cartPage.checkoutButton).toBeVisible();
  });

  test('should show empty cart message when cart is empty', async ({ page }) => {
    await cartPage.goto();
    // If cart is not empty, remove items (if possible)
    // For exploratory: just check for empty message or items
    if (await cartPage.cartItems.count() === 0) {
      await expect(cartPage.emptyCartMessage).toBeVisible();
    }
  });
});
