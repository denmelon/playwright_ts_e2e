import { expect, type Locator, type Page } from '@playwright/test';

export async function addProductToCart(page: Page, index: number) {
    
    const productWrapper = page.locator('.p-6').nth(index)
    const productName = await productWrapper.getByRole('heading').first().textContent()
    const productPrice = await productWrapper.locator('.font-bold').textContent()
    const button = productWrapper.getByRole('button', {
        name: 'Add to cart'
    })

    await button.click()

    return {
        name: productName,
        price: Number(productPrice?.substring(1)) // remove $ sign and convert to number
    }
}