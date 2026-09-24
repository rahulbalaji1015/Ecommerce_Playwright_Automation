import { test, expect, type APIRequestContext } from '@playwright/test';

class UsersApi {
  private readonly baseUrl = 'https://reqres.in';

  constructor(private readonly request: APIRequestContext) {}

  async getAll() {
    return this.request.get(`${this.baseUrl}/api/users?page=1`);
  }

  async getById(id: number) {
    return this.request.get(`${this.baseUrl}/api/users/${id}`);
  }

  async create(user: { name: string; job: string }) {
    return this.request.post(`${this.baseUrl}/api/users`, {
      data: user,
    });
  }
}

test.describe('Users API', () => {
  test('GET /api/users returns a paginated list', async ({ request }) => {
    const api = new UsersApi(request);
    const response = await api.getAll();

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('id');
    expect(body.data[0]).toHaveProperty('email');
  });

  test('GET /api/users/:id returns a single user', async ({ request }) => {
    const api = new UsersApi(request);
    const response = await api.getById(2);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty('email');
  });

  test('GET /api/users/:id with invalid id returns 404', async ({ request }) => {
    const api = new UsersApi(request);
    const response = await api.getById(999999);

    expect(response.status()).toBe(404);
  });

  test('POST /api/users creates a user', async ({ request }) => {
    const api = new UsersApi(request);
    const response = await api.create({ name: 'Rahul', job: 'QA Engineer' });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Rahul');
  });
});