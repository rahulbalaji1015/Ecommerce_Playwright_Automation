import { test, expect } from '../../fixtures/accessibility.fixture';
import { ProductsPage } from '../../pages/productpage';
import { CartPage } from '../../pages/CartPage';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Accessibility - App', () => {
  test('products page has no violations', async ({ page, makeAxeBuilder }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.open();

    const results = await makeAxeBuilder().analyze();
    expect(results.violations).toEqual([]);
  });

  test('cart page has no violations', async ({ page, makeAxeBuilder }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await cartPage.open();

    const results = await makeAxeBuilder().analyze();
    expect(results.violations).toEqual([]);
  });
});