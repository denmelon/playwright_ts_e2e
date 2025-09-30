// cart_remove_flow.spec.ts
// Test removing an item from the cart and verifying the cart is empty
import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/products';
import { CartPage } from './pages/cartPage';

test('Remove item from cart flow', async ({ page }) => {
  await page.goto('/products');
  const productsPage = new ProductsPage(page);
  const addedProduct = await productsPage.addProductToCart(1);

  // Open cart via header cart button
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
  const cartPage = new CartPage(page);
  await cartPage.assertProduct(addedProduct.name!);

  // Remove the item
  await cartPage.removeItemFromCart(addedProduct.name!);

  // Assert cart is empty
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
