import { APIRequestContext } from '@playwright/test';

const BASE = 'https://fakestoreapi.com';

export class ProductsApi {
  constructor(private request: APIRequestContext) {}

  getAll() {
    return this.request.get(`${BASE}/products`);
  }

  getById(id: number) {
    return this.request.get(`${BASE}/products/${id}`);
  }

  create(payload: object) {
    return this.request.post(`${BASE}/products`, { data: payload });
  }
}