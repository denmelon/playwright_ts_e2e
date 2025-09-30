// EXAMPLE: How to use OrderBuilder in a UI test
// import { OrderBuilder } from './builders/orderBuilder';
// ...inside your test...
// const builder = new OrderBuilder();
// builder.setCustomerDetails({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
//   address: '123 Main St',
//   city: 'Anytown',
//   zipCode: '12345',
//   country: 'United States'
// });
// builder.addItem({ productId: '504', quantity: 1 });
// const orderData = builder.build();
// // You can now use orderData in your test, e.g. send it to an API or fill a form
// // Example: await page.fill('[data-test-id="checkout-firstname-input"]', orderData.customerDetails.firstName);
// // ...existing code...
import { test, expect } from '@playwright/test';
// HOW TO USE PAGE OBJECT CLASSES IN YOUR TESTS:
// 1. Import the page object classes at the top:
//    import { ProductsPage } from './pages/products';
//    import { CartPage } from './pages/cart';
//    import { CheckoutPage } from './pages/checkout';
//    import { ContactPage } from './pages/contact';
// 2. In each test, create an instance for each page:
//    const productsPage = new ProductsPage(page);
//    const cartPage = new CartPage(page);
//    ...etc.
// 3. Replace old function calls with class method calls:
//    await productsPage.addProductToCart(1);
//    await cartPage.assertProduct(productName);
//    await cartPage.getSubTotal();
//    ...etc.
// 4. If you need a new action, add a method to the relevant class.
// 5. This makes your tests easier to read and maintain.
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