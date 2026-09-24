import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  test('valid login redirects to products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('invalid login shows an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText('do not match');
  });

  test('locked out user is blocked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage()).toContainText('locked out');
  });
  test('logout returns user to login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory.html/);

  await loginPage.logout();

  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page).not.toHaveURL(/inventory.html/);
});

test('session persists across page reload', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory.html/);

  await page.reload();

  await expect(page).toHaveURL(/inventory.html/);
});

});