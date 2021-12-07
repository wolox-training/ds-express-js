const request = require('supertest');
const axios = require('axios');
const app = require('../../app');
const { TOKEN_NOT_PROVIDED } = require('../../app/constants/errors');
const { generateUser, CREDENTIALS } = require('../factory/factory_users');
const { UNAVAILABLE_ERROR } = require('../../app/errors');

const api = request(app);

describe('Create weet: POST /weets', () => {
  let jwt = '';

  beforeEach(async () => {
    await generateUser();
    const session = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    jwt = session.body.token;
  });

  test('it should create a weet', async () => {
    const { statusCode, body } = await api.post('/weets').set({ Authorization: jwt });
    expect(statusCode).toEqual(201);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        user_id: expect.any(Number),
        content: expect.any(String)
      })
    );
  });

  test('it should validate that the jwt is not provided', async () => {
    const { statusCode, body } = await api.post('/weets');
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual(TOKEN_NOT_PROVIDED);
  });

  test('it should fail service request', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation();
    const { statusCode, body } = await api.post('/weets').set({ Authorization: jwt });
    expect(statusCode).toEqual(503);
    expect(body.internal_code).toEqual(UNAVAILABLE_ERROR);
    mock.mockRestore();
  });
});
