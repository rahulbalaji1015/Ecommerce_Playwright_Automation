import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Visual regression - Login', () => {
  test('login page matches baseline', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await expect(page).toHaveScreenshot('login-page.png');
  });
});