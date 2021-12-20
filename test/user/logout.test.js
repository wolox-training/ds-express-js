const request = require('supertest');
const app = require('../../app');
const { TOKEN_EXPIRED } = require('../../app/constants/errors');
const { CREDENTIALS, generateUser } = require('../factory/factory_users');

const api = request(app);

describe('Logout: POST /users/sessions/invalidate_all', () => {
  let jwt = '';
  beforeEach(async () => {
    await generateUser();
    const session = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    jwt = session.body.token;
  });

  test('it should invalidate the token', async () => {
    await api.post('/users/sessions/invalidate_all').set({ Authorization: jwt });
    const { statusCode, body } = await api.get('/users').set({ Authorization: jwt });
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual(TOKEN_EXPIRED);
  });

  test('it should create a new token to make requests again', async () => {
    await api.post('/users/sessions/invalidate_all').set({ Authorization: jwt });
    jest.useFakeTimers();
    jest.advanceTimersByTime(500);

    const { body } = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    const { statusCode } = await api.get('/users').set({ Authorization: body.token });
    expect(statusCode).toEqual(200);
  });
});
