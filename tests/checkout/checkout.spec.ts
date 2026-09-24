import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productpage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.use({ storageState: 'playwright/.auth/user.json' });

async function addItemAndGoToCheckout(page: import('@playwright/test').Page) {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.open();
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await cartPage.open();
  await cartPage.checkout();
}

test.describe('Checkout', () => {
  test('entering address proceeds to overview', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await addItemAndGoToCheckout(page);

    await checkoutPage.fillAddress('Rahul', 'Kumar', '600001');

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('overview shows correct total', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await addItemAndGoToCheckout(page);
    await checkoutPage.fillAddress('Rahul', 'Kumar', '600001');

    await expect(checkoutPage.totalPrice()).toBeVisible();
    await expect(checkoutPage.totalPrice()).toContainText('Total');
  });

  test('placing order shows confirmation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await addItemAndGoToCheckout(page);
    await checkoutPage.fillAddress('Rahul', 'Kumar', '600001');
    await checkoutPage.placeOrder();

    await expect(checkoutPage.confirmationMessage()).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete/);
  });
});