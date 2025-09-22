const request = require('supertest');
const app = require('../app');


describe('Calculator API', () => {
  test('GET /api/calculator/add returns 8 for 5 + 3', async () => {
    const res = await request(app).get('/api/calculator/add?num1=5&num2=3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 8 });
  });

  test('GET /api/calculator/subtract returns 10 for 12 - 2', async () => {
    const res = await request(app).get('/api/calculator/subtract?num1=12&num2=2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 10 });
  });

  test('GET /api/calculator/multiply returns 50 for 10 * 5', async () => {
    const res = await request(app).get('/api/calculator/multiply?num1=10&num2=5');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 50 });
  });

  test('GET /api/calculator/divide returns 5 for 10 / 2', async () => {
    const res = await request(app).get('/api/calculator/divide?num1=10&num2=2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 5 });
  });

  test('GET /api/calculator/divide rejects divide-by-zero', async () => {
    const res = await request(app).get('/api/calculator/divide?num1=10&num2=0');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Cannot divide by zero');
  });

  test('GET /api/calculator/modulo returns 1 for 10 % 3', async () => {
    const res = await request(app).get('/api/calculator/modulo?num1=10&num2=3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 1 });
  });

  test('GET /api/calculator/modulo rejects modulo-by-zero', async () => {
    const res = await request(app).get('/api/calculator/modulo?num1=10&num2=0');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Cannot modulo by zero');
  });

  test('Decimals: 5.5 + 2.2 = 7.7', async () => {
    const res = await request(app).get('/api/calculator/add?num1=5.5&num2=2.2');
    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(7.7, 5);
  });
});
