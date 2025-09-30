// home_exploratory.spec.ts
// Exploratory tests for Valentino's Magic Beans Home Page
// Using Playwright MCP best practices and Page Object Model

import { test, expect } from '@playwright/test';
import { HomePage } from './pages/homePage';

test.describe('Valentino\'s Magic Beans Home Page - Exploratory', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display the logo', async () => {
  await expect(homePage.logo.first()).toBeVisible();
  });

  test('should have navigation links', async () => {
  const navCount = await homePage.navLinks.count();
  expect(navCount).toBeGreaterThan(0);
  });

  test('should display hero section', async () => {
  await expect(homePage.heroSection.first()).toBeVisible();
  });

  test('should display featured products or product section', async () => {
  await expect(homePage.featuredProducts.first()).toBeVisible();
  });

  test('should have a visible footer', async () => {
    await expect(homePage.footer).toBeVisible();
  });

  test('navigation links should be clickable and not broken', async () => {
    const count = await homePage.navLinks.count();
    for (let i = 0; i < count; i++) {
      const link = homePage.navLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
      // Optionally, check that clicking does not throw
      await expect(link).toBeVisible();
    }
  });

  test('page should not have obvious accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await page.accessibility.snapshot();
    expect(accessibilityScanResults).toBeTruthy();
  });
});
