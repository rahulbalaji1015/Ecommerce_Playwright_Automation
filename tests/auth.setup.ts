import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.waitForURL(/inventory.html/);

  await page.context().storageState({ path: authFile });
});