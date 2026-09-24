import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productpage';
import { CartPage } from '../../pages/CartPage';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Cart', () => {
  test('added item appears in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await cartPage.open();

    await expect(cartPage.cartItem('Sauce Labs Backpack')).toBeVisible();
  });

  test('remove item from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await cartPage.open();
    await cartPage.removeItem('Sauce Labs Backpack');

    await expect(cartPage.itemCount()).toHaveCount(0);
  });

  test('cart badge matches number of items added', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await expect(productsPage.cartBadge()).toHaveText('2');
  });

  test('checkout button navigates to checkout step one', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await cartPage.open();
    await cartPage.checkout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });
});