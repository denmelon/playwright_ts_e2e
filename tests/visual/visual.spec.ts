
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
	await page.goto('/');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('homepage.png');
});
