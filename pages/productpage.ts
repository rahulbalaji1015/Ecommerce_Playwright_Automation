import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await super.open('/inventory.html');
  }

  async sortBy(option: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async openProduct(name: string) {
    await this.page.getByText(name, { exact: true }).click();
  }

  async addProductToCart(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }
}