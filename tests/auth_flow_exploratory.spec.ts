// auth_flow_exploratory.spec.ts
// Exploratory tests for authentication (login and sign up) flow
import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/authPage';

test.describe('Authentication Flow - Exploratory', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test('should display login form and validate required fields', async ({ page }) => {
    await authPage.gotoLogin();
    await expect(authPage.loginForm).toBeVisible();
    await authPage.submitButton.click();
  await expect(authPage.errorMessage.first()).toBeVisible();
  });

  test('should display sign up form and validate required fields', async ({ page }) => {
    await authPage.gotoSignUp();
    await expect(authPage.signUpForm).toBeVisible();
    await authPage.submitButton.click();
  await expect(authPage.errorMessage.first()).toBeVisible();
  });

  test('should show error for invalid login', async ({ page }) => {
    await authPage.gotoLogin();
    await authPage.emailInput.fill('invalid@example.com');
    await authPage.passwordInput.fill('wrongpassword');
    await authPage.submitButton.click();
  await expect(authPage.notificationError.first()).toBeVisible();
  });
});
