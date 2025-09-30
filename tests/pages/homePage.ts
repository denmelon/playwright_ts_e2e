// productsPage.ts
// Page Object Model for Valentino's Magic Beans Home Page
// Stores locators and actions for the home page

import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly navLinks: Locator;
  readonly heroSection: Locator;
  readonly featuredProducts: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
  // Logo: heading in banner
  this.logo = page.locator('banner h1, header h1, [ref="e10"]');
  // Navigation links: nav links in banner
  this.navLinks = page.locator('banner nav a, nav a, [ref="e12"], [ref="e13"], [ref="e14"]');
  // Hero section: main h1 and intro paragraph
  this.heroSection = page.locator('main h1, main p, [ref="e29"], [ref="e30"]');
  // Featured products: product headings under "Featured Coffees"
  this.featuredProducts = page.locator('main h3:has-text("Brazilian Santos"), main h3:has-text("Colombian Supreme"), main h3:has-text("Ethiopian Highlands")');
  // Footer/contentinfo
  this.footer = page.locator('contentinfo, footer, [ref="e114"]');
  }

  async goto() {
    await this.page.goto('https://valentinos-magic-beans.click/');
  }
}
