import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productpage';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Visual regression - App', () => {
  test('products page matches baseline', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.open();

    await expect(page).toHaveScreenshot('products-page.png');
  });
});