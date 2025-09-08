import { test, expect } from '@playwright/test';
import { CartPage } from './pages/cart';
import { ProductsPage } from './pages/products';
import { CheckoutPage, testValues } from './pages/checkout';
import { ContactPage } from './pages/contact';


test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('/products');

    const productsPage = new ProductsPage(page);
    const addedProduct = await productsPage.addProductToCart(1);

    await page. locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    // assert product name
    const cartPage = new CartPage(page);
    await cartPage.assertProduct(addedProduct.name!);

    // assert subtotal
    const subTotal = await cartPage.getSubTotal();
    expect(subTotal).toEqual(addedProduct.price);
})

test('Complete workflow for product order', async ({ page }) => {
    await page.goto('/products');

    const productsPage = new ProductsPage(page);
    const addedProduct = await productsPage.addProductToCart(1);

    await page. locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    // assert product name
    const cartPage = new CartPage(page);
    await cartPage.assertProduct(addedProduct.name!);

    // assert subtotal
    const subTotal = await cartPage.getSubTotal();
    expect(subTotal).toEqual(addedProduct.price);

    // proceed to checkout
    await page.getByRole('button', {name: 'Proceed to Checkout'}).click();
    
    // fill checkout information
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.addContactInfo();
    await checkoutPage.addShippingAddress();
    await checkoutPage.addPaymentInformation();
    await checkoutPage.placeOrder();

    // get order id
    const orderWrapper = page.getByText('Your Order ID is:').locator('..');
    const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent();

    // go to contact page
    await page.getByRole('button', {name: 'Track Your Order'}).click();
    const contactPage = new ContactPage(page);
    await contactPage.fillOrderIdAndEmail(orderId!, testValues.contactInformation.email);
    await contactPage.clickTrackOrder();

    // check order details
    const firstOrder = page.getByText(addedProduct.name!);
    await expect(firstOrder).toBeVisible();
})

test('Complete workflow for product order - with steps', async ({ page }) => {
    await page.goto('/products');

    const productsPage = new ProductsPage(page);
    let addedProduct: Awaited<ReturnType<typeof productsPage.addProductToCart>> = {} as any;

    await test.step('Add product to cart', async () => {
        addedProduct = await productsPage.addProductToCart(1);
    });

    await test.step('Go to checkout page', async () => {
        await page. locator('[data-test-id="header-cart-button"]').getByRole('button').click();
        await page.getByRole('button', {name: 'Proceed to Checkout'}).click();
    });

    await test.step('Complete checkout information', async () => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.addContactInfo();
        await checkoutPage.addShippingAddress();
        await checkoutPage.addPaymentInformation();
        await checkoutPage.placeOrder();
    });

    let orderId: string | null;
    
    await test.step('Get order ID', async () => {
        const orderWrapper = page.getByText('Your Order ID is:').locator('..');
        orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent();
    });

    await test.step('Go to contact page', async () => {
        await page.getByRole('button', {name: 'Track Your Order'}).click();
        const contactPage = new ContactPage(page);
        await contactPage.fillOrderIdAndEmail(orderId!, testValues.contactInformation.email);
        await contactPage.clickTrackOrder();
    });

    await test.step('Check order dedtails', async () => {
        const firstOrder = page.getByText(addedProduct.name!);
        await expect(firstOrder).toBeVisible();
    });

})