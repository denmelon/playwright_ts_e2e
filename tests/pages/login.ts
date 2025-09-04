import { expect, Page } from "@playwright/test";

export async function login(page: Page, email: string, pass: string) {
    await page.locator('[data-test-id="login-email-input"]').fill(email);
    await page.locator('[data-test-id="login-password-input"]').fill(pass);
    await page.locator('[data-test-id="login-submit-button"]').click();
}

export async function verifySuccessfulLogin(page: Page) {
    // After successful login, user should be redirected to home page
    await expect(page).toHaveURL('/');
}