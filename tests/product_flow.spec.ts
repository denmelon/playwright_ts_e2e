import { test, expect } from '@playwright/test';
import * as productsPage from './pages/products';
import * as cartPage from './pages/cart';
import * as checkoutPage from './pages/checkout';
import * as contactPage from './pages/contact';

test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('/products');

    const addedProduct = await productsPage.addProductToCart(page, 1);

    await page. locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    // assert product name
    await cartPage.assertProduct(page, addedProduct.name!);

    const subTotal = await cartPage.getSubTotal(page);
    expect(subTotal).toEqual(addedProduct.price);
})

test('Complete workflow for product order', async ({ page }) => {
    await page.goto('/products');

    const addedProduct = await productsPage.addProductToCart(page, 1);

    await page. locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    // assert product name
    await cartPage.assertProduct(page, addedProduct.name!);

    // assert subtotal
    const subTotal = await cartPage.getSubTotal(page);
    expect(subTotal).toEqual(addedProduct.price);

    // proceed to checkout
    await page.getByRole('button', {name: 'Proceed to Checkout'}).click();

    await checkoutPage.addContactInfo(page);
    await checkoutPage.addShippingAddress(page);
    await checkoutPage.addPaymentInformation(page);
    await checkoutPage.placeOrder(page);

    // get order id
    const orderWrapper = page.getByText('Your Order ID is:').locator('..');
    const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent();

    // go to contact page
    await page.getByRole('button', {name: 'Track Your Order'}).click();
    await contactPage.fillOrderIdAndEmail(page, orderId!, checkoutPage.testValues.contactInformation.email);
    await contactPage.clickTrackOrder(page);

    // check order details
    const firstOrder = page.getByText(addedProduct.name!);
    await expect(firstOrder).toBeVisible();
})

test('Complete workflow for product order - with steps', async ({ page }) => {
    await page.goto('/products');

    let addedProduct: Awaited<ReturnType<typeof productsPage.addProductToCart>> = {} as any;

    await test.step('Add product to cart', async () => {
        addedProduct = await productsPage.addProductToCart(page, 1);
    });

    await test.step('Go to checkout page', async () => {
        await page. locator('[data-test-id="header-cart-button"]').getByRole('button').click();
        await page.getByRole('button', {name: 'Proceed to Checkout'}).click();
    });

    await test.step('Complete checkout information', async () => {
        await checkoutPage.addContactInfo(page);
        await checkoutPage.addShippingAddress(page);
        await checkoutPage.addPaymentInformation(page);
        await checkoutPage.placeOrder(page);
    });

    let orderId: string | null;
    
    await test.step('Get order ID', async () => {
        const orderWrapper = page.getByText('Your Order ID is:').locator('..');
        orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent();
    });

    await test.step('Go to contact page', async () => {
        await page.getByRole('button', {name: 'Track Your Order'}).click();
        await contactPage.fillOrderIdAndEmail(page, orderId!, checkoutPage.testValues.contactInformation.email);
        await contactPage.clickTrackOrder(page);
    });

    await test.step('Check order dedtails', async () => {
        const firstOrder = page.getByText(addedProduct.name!);
        await expect(firstOrder).toBeVisible();
    });

})