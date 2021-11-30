const request = require('supertest');
const app = require('../../app');
const { NUMBER_USERS } = require('../constants');
const { TOKEN_NOT_PROVIDED } = require('../../app/constants/errors');
const { AUTHENTICATION_ERROR } = require('../../app/errors');
const { generateUsers, CREDENTIALS } = require('../factory/factory_users');

const api = request(app);

describe('User list: GET /users', () => {
  beforeEach(async () => {
    await generateUsers(NUMBER_USERS);
  });

  test('it should return the list users', async () => {
    const session = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    const { token } = session.body;

    const { statusCode, body } = await api.get('/users').set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body).toEqual(
      expect.objectContaining({
        current_page: expect.any(Number),
        total_count: expect.any(Number),
        total_pages: expect.any(Number),
        users: expect.any(Array)
      })
    );
    expect(body.users).toHaveLength(NUMBER_USERS);
  });

  test('it should fail due to invalid token provided', async () => {
    const { statusCode, body } = await api.get('/users').set({ Authorization: 'token' });
    expect(statusCode).toEqual(401);
    expect(body.internal_code).toEqual(AUTHENTICATION_ERROR);
    expect(body.message).toEqual('jwt malformed');
  });

  test('it should validate that the jwt is not provided', async () => {
    const { statusCode, body } = await api.get('/users');
    expect(statusCode).toEqual(401);
    expect(body.internal_code).toEqual(AUTHENTICATION_ERROR);
    expect(body.message).toEqual(TOKEN_NOT_PROVIDED);
  });
});
