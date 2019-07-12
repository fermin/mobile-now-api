const supertest = require('supertest');
const app = require('../../app.js');
const request = supertest(app.listen());

test('Failed when params is lost', async () => {
  const response = await request
    .post('/api/freightFee')
    .send([{
      product_count: 1
    }]);
  expect(response.body.success).toBe(false);
});

test('Return 10 when have no discount', async () => {
  const response = await request
    .post('/api/freightFee')
    .send([{
      product_count: 1,
      product_price: 10,
      product_weight: 1
    }]);
  expect(response.body.freightFee).toBe(10);
})

test('Return 0 when total price is too large', async () => {
  const response = await request
    .post('/api/freightFee')
    .send([{
      product_count: 1,
      product_price: 1000,
      product_weight: 2
    }]);
  expect(response.body.freightFee).toBe(0);
})