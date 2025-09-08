// ACTION POINT: Refactor this file to use a LoginPage class.
// Example:
// class LoginPage {
//   constructor(private page: Page) {}
//   async login(email: string, pass: string) { ... }
//   async verifySuccessfulLogin() { ... }
// }
// Move the functions below into methods of the LoginPage class.
// This will make your login actions reusable and organized.
import { expect, Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}

    async login(email: string, pass: string) {
        await this.page.locator('[data-test-id="login-email-input"]').fill(email);
        await this.page.locator('[data-test-id="login-password-input"]').fill(pass);
        await this.page.locator('[data-test-id="login-submit-button"]').click();
    }

    async verifySuccessfulLogin() {
        // After successful login, user should be redirected to home page
        await expect(this.page).toHaveURL('/');
    }
}