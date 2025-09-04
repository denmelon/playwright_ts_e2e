import { test, expect } from '@playwright/test';
import { request } from 'http';

test('browse products and create order', async ({ request }) => {
    // step 1: get all products
    const productsResponse = await request.get('/products');
    expect(productsResponse.status()).toBe(200);

    const productBody = await productsResponse.json();
    expect(productBody.success).toBe(true);
    expect(Array.isArray(productBody.data)).toBe(true);

    // step 2: find first product with stock > 0
    const products = productBody.data;
    const availableProduct = products.find(product => product.stock > 0);

    expect(availableProduct).toBeDefined();
    expect(availableProduct.stock).toBeGreaterThan(0);

    // step 3: create order with the selected product
    const orderPayLoad = {
        customerDetails: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            address: "123 Main St",
            city: "Anytown",
            zipCode: "12345",
            country: "United States"
        },
        items: [
            {
                productId: "504",
                quantity: 1
            }
        ]
    };

    const orderResponse = await request.post('/orders', {
        data: orderPayLoad
    });

    // validate order creation response
    expect(orderResponse.status()).toBe(201);
    expect(orderResponse.headers()['content-type']).toBe('application/json');

    const orderBody = await orderResponse.json();

    console.log('Order created:', orderBody);
    
    // validate order response
    expect(orderBody).toHaveProperty('success', true);
    expect(orderBody).toHaveProperty('data');

    // validate order data structure
    const orederData = orderBody.data;
    expect(orederData).toHaveProperty('orderId');
    expect(orederData).toHaveProperty('message', 'Order created successfully');

    // validate orderId format (to be uppercase alphanumeric)
    expect(typeof orederData.orderId).toBe('string');
    expect(orederData.orderId).toMatch(/^[A-Z0-9]+$/);
    expect(orederData.orderId.length).toBeGreaterThan(0);
});
