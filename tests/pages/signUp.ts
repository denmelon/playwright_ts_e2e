// ACTION POINT: Refactor this file to use a SignUpPage class.
// Example:
// class SignUpPage {
//   constructor(private page: Page) {}
//   async signUp(email: string) { ... }
//   async addConfirmationCode(code: string) { ... }
// }
// Move the functions below into methods of the SignUpPage class.
// This will help you keep all sign-up actions together.
import { Page } from "@playwright/test";

export const signUpData = {
    firstName: 'someFirstName',
    lastName: 'someLastName',
    pass: '123456sdFG!@'
}

export class SignUpPage {
    constructor(private page: Page) {}

    async signUp(email: string) {
        await this.page.locator('[data-test-id="signup-firstname-input"]').fill(signUpData.firstName);
        await this.page.locator('[data-test-id="signup-lastname-input"]').fill(signUpData.lastName);
        await this.page.locator('[data-test-id="signup-email-input"]').fill(email);
    }

    async completeSignUp() {
        await this.page.locator('[data-test-id="signup-password-input"]').fill(signUpData.pass);
        await this.page.locator('[data-test-id="signup-submit-button"]').click();
    }

    async addConfirmationCode(code: string) {
        const input = this.page.locator('input[inputmode="numeric"]');
        await input.fill(code);
        await this.page.locator('[data-test-id="confirm-signup-submit-button"]').click();
    }
}