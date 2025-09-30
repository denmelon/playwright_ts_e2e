// cart_quantity_multi_flow.spec.ts
// Test updating quantity for multiple products in the cart and verifying subtotals
import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/products';
import { CartPage } from './pages/cartPage';

test('Update quantity for multiple products in cart flow', async ({ page }) => {
  await page.goto('/products');
  const productsPage = new ProductsPage(page);
  // Get the number of products displayed
  const productCount = await page.locator('.p-6').count();
  expect(productCount).toBeGreaterThanOrEqual(2);

  // Select two different random indices
  let firstIndex = Math.floor(Math.random() * productCount);
  let secondIndex = Math.floor(Math.random() * (productCount - 1));
  if (secondIndex >= firstIndex) secondIndex++;

  // Add two different products
  const addedProduct1 = await productsPage.addProductToCart(firstIndex);
  const addedProduct2 = await productsPage.addProductToCart(secondIndex);

  // Open cart via header cart button
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
  const cartPage = new CartPage(page);
  await cartPage.assertProduct(addedProduct1.name!);
  await cartPage.assertProduct(addedProduct2.name!);

  // Assert both products are present in the cart
  await cartPage.assertProduct(addedProduct1.name!);
  await cartPage.assertProduct(addedProduct2.name!);

  // Increase quantity of each product by one (to 2)
  await cartPage.updateQuantityInCart(addedProduct1.name!, 2);
  await cartPage.updateQuantityInCart(addedProduct2.name!, 2);

  // Assert subtotal is correct: (2 * price1) + (2 * price2)
  const subTotal = await cartPage.getSubTotal();
  expect(subTotal).toEqual(addedProduct1.price * 2 + addedProduct2.price * 2);
});