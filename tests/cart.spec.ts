import { test, expect } from '@playwright/test';

test('Item is added to shoping cart', async ({ page }) => {
    await page.goto('/products');

    const firstProductWrapper = page.locator('.p-6').first()
    const firstProductName = await firstProductWrapper.getByRole('heading').first().textContent()
    const firstProductPrice = await firstProductWrapper.locator('.font-bold').textContent()
    const firstButton = firstProductWrapper.getByRole('button', {
        name: 'Add to cart'
    })

    await firstButton.click()
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click()

    // assert first product name
    const firstProductHeading = page.getByRole('heading', {
        name: firstProductName!
    })
    await expect(firstProductHeading).toBeVisible()

    // assert subtotal
    const subTotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold')
    const subTotal = await subTotalWrapper.textContent()
    const expectedSubTotal = Number(subTotal?.substring(1)) // remove $ sign and convert to number
    const actualSubTotal = Number(firstProductPrice?.substring(1)) // remove $ sign and convert to number
    expect(expectedSubTotal).toEqual(actualSubTotal)
});

