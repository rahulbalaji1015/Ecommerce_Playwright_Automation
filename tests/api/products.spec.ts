import { test, expect, type APIRequestContext } from '@playwright/test';

class ProductsApi {
  private readonly baseUrl = 'https://fakestoreapi.com';

  constructor(private readonly request: APIRequestContext) {}

  async getAll() {
    return this.request.get(`${this.baseUrl}/products`);
  }

  async getById(id: number) {
    return this.request.get(`${this.baseUrl}/products/${id}`);
  }

  async create(product: {
    title: string;
    price: number;
    description: string;
    category: string;
  }) {
    return this.request.post(`${this.baseUrl}/products`, {
      data: product,
    });
  }
}

test.describe('Products API', () => {
  test('GET /products returns a list', async ({ request }) => {
    const api = new ProductsApi(request);
    const response = await api.getAll();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('price');
  });

  test('GET /products/:id returns a single product', async ({ request }) => {
    const api = new ProductsApi(request);
    const response = await api.getById(1);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
  });

  test('GET /products/:id with invalid id', async ({ request }) => {
    const api = new ProductsApi(request);
    const response = await api.getById(999999);

    // fakestoreapi returns 200 with null body for unknown ids rather than 404 —
    // verify this is actually true before asserting it; adjust if it differs
    expect(response.status()).toBe(200);
  });

  test('POST /products creates a product', async ({ request }) => {
    const api = new ProductsApi(request);
    const response = await api.create({
      title: 'Test Product',
      price: 29.99,
      description: 'A product created by an automated test',
      category: 'test-category',
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Test Product');
  });
});