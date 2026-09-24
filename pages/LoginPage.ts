import { Page } from '@playwright/test';
import { BasePage } from './basepage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await super.open('/');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  async logout() {
{
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('#logout_sidebar_link').click();
}
  }

  errorMessage() {
    return this.page.getByTestId('error');
  }
}