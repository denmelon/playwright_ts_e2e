// contact_flow_exploratory.spec.ts
// Exploratory tests for contact form using ContactPage
import { test, expect } from '@playwright/test';
import { ContactPage } from './pages/contact';

test.describe('Contact Form Flow - Exploratory', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await page.goto('https://valentinos-magic-beans.click/contact');
  });

  test('should show error if required fields are empty', async ({ page }) => {
    await contactPage.clickTrackOrder();
    await expect(page.locator('text=required')).toBeVisible();
  });

  test('should fill order id and email and submit', async ({ page }) => {
    await contactPage.fillOrderIdAndEmail('123456', 'test@email.com');
    await contactPage.clickTrackOrder();
    // Expect 'Order Not Found' heading for invalid order
    await expect(page.getByRole('heading', { name: 'Order Not Found' })).toBeVisible();
  });
});
