import { test, expect } from '@playwright/test';

test('get all products', async ({ request }) => {
    // make http request
    const response = await request.get('/products');

    // check status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // check headers
    expect(response.headers()['content-type']).toBe('application/json');

    // parse JSON
    const responseBody = await response.json();

    // response structure validation
    expect(responseBody).toHaveProperty('success', true);
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);

    // log response
    // console.log('Response:', responseBody);
});