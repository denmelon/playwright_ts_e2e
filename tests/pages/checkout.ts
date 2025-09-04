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

export async function addContactInfo(page: Page) {
    await page.locator('[data-test-id="checkout-firstname-input"]').fill(testValues.contactInformation.firstName);
    await page.locator('[data-test-id="checkout-lastname-input"]').fill(testValues.contactInformation.lastName);
    await page.locator('[data-test-id="checkout-email-input"]').fill(testValues.contactInformation.email);
}

export async function addShippingAddress(page: Page) {
    await page.locator('[data-test-id="checkout-address-input"]').fill(testValues.shippingAddress.address);
    await page.locator('[data-test-id="checkout-city-input"]').fill(testValues.shippingAddress.city);
    await page.locator('[data-test-id="checkout-zipcode-input"]').fill(testValues.shippingAddress.zipCode);
    await page.locator('[data-test-id="checkout-country-input"]').fill(testValues.shippingAddress.country);
}

export async function addPaymentInformation(page: Page) {
    await page.locator('[data-test-id="checkout-cardname-input"]').fill(testValues.paymentInformation.nameOnCard);
    await page.locator('[data-test-id="checkout-cardnumber-input"]').fill(testValues.paymentInformation.cardNumber);
    await page.locator('[data-test-id="checkout-cardexpiry-input"]').fill(testValues.paymentInformation.expiry);
    await page.locator('[data-test-id="checkout-cardcvc-input"]').fill(testValues.paymentInformation.cvc);
}

export async function placeOrder(page: Page) {
    await page.locator('[data-test-id="place-order-button"]').click();
}