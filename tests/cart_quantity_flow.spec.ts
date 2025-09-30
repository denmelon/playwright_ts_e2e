// cart_quantity_flow.spec.ts
// Test updating quantity in cart and verifying subtotal updates
import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/products';
import { CartPage } from './pages/cartPage';

test('Update quantity in cart flow', async ({ page }) => {
  await page.goto('/products');
  const productsPage = new ProductsPage(page);
  const addedProduct = await productsPage.addProductToCart(1);

  // Open cart via header cart button
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
  const cartPage = new CartPage(page);
  await cartPage.assertProduct(addedProduct.name!);

  // Update quantity to 2 using the plus button
  await cartPage.updateQuantityInCart(addedProduct.name!, 2);

  // Assert subtotal is double the product price
  const subTotal = await cartPage.getSubTotal();
  expect(subTotal).toEqual(addedProduct.price * 2);
});
