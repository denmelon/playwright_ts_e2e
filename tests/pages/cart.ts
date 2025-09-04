import { Page, expect } from '@playwright/test';

export async function assertProduct(page: Page, heading: string) {
    const productHeading = page.getByRole('heading', {
        name: heading
    });
    await expect(productHeading).toBeVisible();
}

export async function getSubTotal(page: Page) {
    const subTotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subTotal = await subTotalWrapper.textContent();
    return Number(subTotal?.substring(1)); // remove $ sign and convert to number
}