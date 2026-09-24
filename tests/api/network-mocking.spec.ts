import { test, expect } from '@playwright/test';

const API_URL = 'https://fakestoreapi.com/products';

test.describe('Network mocking', () => {
  test('mocked success response', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, title: 'Mocked Product', price: 9.99 },
        ]),
      });
    });

    await page.goto('about:blank');
    const data = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.json();
    }, API_URL);

    expect(data).toHaveLength(1);
    expect(data[0].title).toBe('Mocked Product');
  });

  test('mocked empty response', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('about:blank');
    const data = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.json();
    }, API_URL);

    expect(data).toHaveLength(0);
  });

  test('mocked 500 server error', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('about:blank');
    const status = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.status;
    }, API_URL);

    expect(status).toBe(500);
  });

  test('mocked slow response', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 1, title: 'Slow Product', price: 5.0 }]),
      });
    });

    await page.goto('about:blank');
    const start = Date.now();
    const data = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.json();
    }, API_URL);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(2000);
    expect(data[0].title).toBe('Slow Product');
  });
});