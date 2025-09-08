// ACTION POINT: Refactor this file to use a CheckoutPage class.
// Example:
// class CheckoutPage {
//   constructor(private page: Page) {}
//   async addContactInfo() { ... }
//   async addShippingAddress() { ... }
//   async addPaymentInformation() { ... }
//   async placeOrder() { ... }
// }
// Move the functions below into methods of the CheckoutPage class.
// This will make your code easier to use and maintain.
import { Page } from "@playwright/test";

export const testValues = {
    contactInformation: {
        firstName: 'Denis',
        lastName: 'Jejenco',
        email: 'jdmail@email.com'
    },
    shippingAddress: {
        address: 'Long street',
        city: 'New York',
        zipCode: '10001',
        country: 'United States',
    },
    paymentInformation: {
        nameOnCard: 'Denis Jejenco',
        cardNumber: '4242 4242 4242 4242',
        expiry: '12/34',
        cvc: '123'
    }
}

export class CheckoutPage {
    testValues: any;
    constructor(private page: Page) {}

    async addContactInfo() {
        await this.page.locator('[data-test-id="checkout-firstname-input"]').fill(testValues.contactInformation.firstName);
        await this.page.locator('[data-test-id="checkout-lastname-input"]').fill(testValues.contactInformation.lastName);
        await this.page.locator('[data-test-id="checkout-email-input"]').fill(testValues.contactInformation.email);
    }

    async addShippingAddress() {
        await this.page.locator('[data-test-id="checkout-address-input"]').fill(testValues.shippingAddress.address);
        await this.page.locator('[data-test-id="checkout-city-input"]').fill(testValues.shippingAddress.city);
        await this.page.locator('[data-test-id="checkout-zipcode-input"]').fill(testValues.shippingAddress.zipCode);
        await this.page.locator('[data-test-id="checkout-country-input"]').fill(testValues.shippingAddress.country);
    }

    async addPaymentInformation() {
        await this.page.locator('[data-test-id="checkout-cardname-input"]').fill(testValues.paymentInformation.nameOnCard);
        await this.page.locator('[data-test-id="checkout-cardnumber-input"]').fill(testValues.paymentInformation.cardNumber);
        await this.page.locator('[data-test-id="checkout-cardexpiry-input"]').fill(testValues.paymentInformation.expiry);
        await this.page.locator('[data-test-id="checkout-cardcvc-input"]').fill(testValues.paymentInformation.cvc);
    }

    async placeOrder() {
        await this.page.locator('[data-test-id="place-order-button"]').click();
    }
}