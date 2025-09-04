import { test, expect } from '@playwright/test';

test('auth test', async ({ page }) => {
    await page.goto('/');
    // check if user is authenticated:
    await page.locator('[id="radix-:r3:"]').click();
    const welcomeMessage = page.getByText('Welcome!');
    await expect(welcomeMessage).toBeVisible();
    // page is autenticated
});