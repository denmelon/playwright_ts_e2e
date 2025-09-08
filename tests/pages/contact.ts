// ACTION POINT: Refactor this file to use a ContactPage class.
// Example:
// class ContactPage {
//   constructor(private page: Page) {}
//   async fillOrderIdAndEmail(orderId: string, email: string) { ... }
//   async clickTrackOrder() { ... }
// }
// Move the functions below into methods of the ContactPage class.
// This will help you keep all contact page actions together.
import { Page } from "@playwright/test";

export class ContactPage {
  constructor(private page: Page) {}

  async  fillOrderIdAndEmail(orderId: string, email: string) {
    await this.page.locator('[data-test-id="contact-order-id-input"]').fill(orderId);
    await this.page.locator('[data-test-id="contact-email-input"]').fill(email);
  }

  async clickTrackOrder() {
    await this.page.locator('[data-test-id="contact-track-order-button"]').click();
  }
}