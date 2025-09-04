import { test, expect} from '@playwright/test';

test('create order', async ({ request }) => {
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

    // check status code
    expect(orderResponse.status()).toBe(201);

    const orderBody = await orderResponse.json();

    // validate order response
    expect(orderBody).toHaveProperty('success', true);
    expect(orderBody).toHaveProperty('data');

    console.log('Order Response:', orderBody);
});