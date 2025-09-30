
import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('homepage is accessible', async ({ page }) => {
	await page.goto('/');
	await injectAxe(page);
	await checkA11y(page, undefined, {
		detailedReport: true,
		detailedReportOptions: { html: true }
	});
});
