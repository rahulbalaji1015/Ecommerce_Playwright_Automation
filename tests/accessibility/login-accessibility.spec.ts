import { test, expect } from '../../fixtures/accessibility.fixture';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Accessibility - Login', () => {
  test('login page has no violations', async ({ page, makeAxeBuilder }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    const results = await makeAxeBuilder().analyze();
    expect(results.violations).toEqual([]);
  });
});