import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await super.open('/cart.html');
  }

  cartItem(name: string) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async removeItem(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  itemCount() {
    return this.page.locator('.cart_item');
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}