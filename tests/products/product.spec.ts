import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productpage';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Products', () => {
  test('products page loads with items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.open();

    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('sort by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.open();
    await productsPage.sortBy('lohi');

    const firstPrice = await page.locator('.inventory_item_price').first().innerText();
    expect(firstPrice).toBe('$7.99');
  });

  test('open a product shows its details', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.open();
    await productsPage.openProduct('Sauce Labs Backpack');

    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
  });

  test('add product to cart updates badge', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.open();
    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(productsPage.cartBadge()).toHaveText('1');
  });
});