// authPage.ts
// Page Object Model for Valentino's Magic Beans Auth (Login/Sign Up) Page
import { Page, Locator } from '@playwright/test';

export class AuthPage {
  readonly notificationError: Locator;
  readonly page: Page;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly loginForm: Locator;
  readonly signUpForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('a:has-text("Login")');
    this.signUpLink = page.locator('a:has-text("Sign Up")');
  this.loginForm = page.locator('main h3:has-text("Login")');
  this.signUpForm = page.locator('main h3:has-text("Sign Up")');
  this.emailInput = page.locator('input[type="email"], input[placeholder*="Email"]');
  this.passwordInput = page.locator('input[type="password"], input[placeholder*="Password"]');
  this.submitButton = page.locator('[data-test-id="login-submit-button"], [data-test-id="signup-submit-button"]');
  this.errorMessage = page.locator('main p:has-text("required"), main p:has-text("valid"), main p:has-text("failed"), main p:has-text("does not exist")');
  this.notificationError = page.getByText('Login Failed').or(page.getByText('User does not exist'));
  }

  async gotoLogin() {
    await this.page.goto('https://valentinos-magic-beans.click/login');
  }

  async gotoSignUp() {
    await this.page.goto('https://valentinos-magic-beans.click/signup');
  }
}
