const request = require('supertest');
const app = require('../../app');
const { TOKEN_NOT_PROVIDED } = require('../../app/constants/errors').responses;
const { AUTHENTICATION_ERROR } = require('../../app/errors');

const { generateUsers, credentials } = require('../factory/factory_users');

describe('User list: GET /users', () => {
  beforeEach(async () => {
    await generateUsers(10);
  });

  test('it should return the list users', async () => {
    const session = await request(app)
      .post('/users/sessions')
      .send(credentials);
    const { token } = session.body;

    const { statusCode, body } = await request(app)
      .get('/users')
      .set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty('users');
    expect(body.users.length).toBeGreaterThan(0);
    expect(body).toHaveProperty('pagination');
  });

  test('it should validate jwt', async () => {
    const { statusCode, body } = await request(app)
      .get('/users')
      .set({ Authorization: 'token' });
    expect(statusCode).toEqual(401);
    expect(body.internal_code).toEqual(AUTHENTICATION_ERROR);
    expect(body.message).toEqual('jwt malformed');
  });

  test('it should validate that the jwt is not provided', async () => {
    const { statusCode, body } = await request(app).get('/users');
    expect(statusCode).toEqual(401);
    expect(body.internal_code).toEqual(AUTHENTICATION_ERROR);
    expect(body.message).toEqual(TOKEN_NOT_PROVIDED);
  });
});
