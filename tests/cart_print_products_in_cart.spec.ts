// cart_print_products_in_cart.spec.ts
// Add two different products to the cart and print their names
import { test } from '@playwright/test';
import { ProductsPage } from './pages/products';
import { CartPage } from './pages/cartPage';

test('Add two products and print their names in cart', async ({ page }) => {
  await page.goto('/products');
  const productsPage = new ProductsPage(page);
  // Add two different products
  const addedProduct1 = await productsPage.addProductToCart(0);
  const addedProduct2 = await productsPage.addProductToCart(1);

  // Open cart via header cart button
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
  const cartPage = new CartPage(page);

  // Print product names in the cart
  console.log('Added to cart:', addedProduct1.name, 'and', addedProduct2.name);
});