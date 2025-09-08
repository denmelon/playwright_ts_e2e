// ACTION POINT: Refactor this file to use a ProductsPage class.
// Example:
// class ProductsPage {
//   constructor(private page: Page) {}
// HOW TO USE THIS FILE:
// 1. Import ProductsPage in your test file:
//    import { ProductsPage } from './pages/products';
// 2. Create an instance in your test:
//    const productsPage = new ProductsPage(page);
// 3. Call methods like:
//    await productsPage.addProductToCart(1);
// 4. You can add more methods to this class for other actions on the products page.
//    For example: getProductName(index), getProductPrice(index), etc.
// 5. If you need to check something on the products page, add a new method to this class.
//   async addProductToCart(index: number) { ... }
// }
// Move the function below into a method of the ProductsPage class.
// This will help you keep all product page actions together.
import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    async addProductToCart(index: number) {
        const productWrapper = this.page.locator('.p-6').nth(index);
        const productName = await productWrapper.getByRole('heading').first().textContent();
        const productPrice = await productWrapper.locator('.font-bold').textContent();
    const button = productWrapper.getByRole('button', {
        name: 'Add to cart'
    })

    await button.click()

    return {
        name: productName,
        price: Number(productPrice?.substring(1)) // remove $ sign and convert to number
    };
    }
}