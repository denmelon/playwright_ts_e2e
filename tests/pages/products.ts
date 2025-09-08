// ACTION POINT: Refactor this file to use a ProductsPage class.
// Example:
// class ProductsPage {
//   constructor(private page: Page) {}
//   async addProductToCart(index: number) { ... }
// }
// Move the function below into a method of the ProductsPage class.
// This will help you keep all product page actions together.
import { expect, type Locator, type Page } from '@playwright/test';

class ProductsPage {
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