import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillAddress(firstName: string, lastName: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }

  totalPrice() {
    return this.page.locator('.summary_total_label');
  }

  async placeOrder() {
    await this.page.locator('[data-test="finish"]').click();
  }

  confirmationMessage() {
    return this.page.locator('.complete-header');
  }
}