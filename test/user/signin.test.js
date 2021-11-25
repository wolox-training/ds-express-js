const request = require('supertest');
const app = require('../../app');
const { CREDENTIALS, generateUser } = require('../factory/factory_users');
const { AUTH_ERROR } = require('../../app/constants/errors');
const { AUTHENTICATION_ERROR, DATABASE_ERROR } = require('../../app/errors');
const { users: User } = require('../../app/models');
const db = require('../../app/models');

const { ADMIN_USER } = CREDENTIALS;
const api = request(app);

describe('Sign in: POST /users/sessions', () => {
  beforeEach(async () => {
    await generateUser();
  });

  test('it should sign in successfully', async () => {
    const data = await api.post('/users/sessions').send(ADMIN_USER);
    expect(data.statusCode).toEqual(200);
    expect(data.body).toHaveProperty('token');
  });

  test('it should not validate the user with invalid credentials', async () => {
    const userCredentials = { ...ADMIN_USER, password: '12345678' };
    const { statusCode, body } = await api.post('/users/sessions').send(userCredentials);
    expect(statusCode).toEqual(401);
    expect(body.internal_code).toEqual(AUTHENTICATION_ERROR);
  });

  test('it should validate mandatory parameters', async () => {
    const { statusCode, body } = await api.post('/users/sessions').send();
    expect(statusCode).toEqual(400);
    expect(body.message[0].message).toMatch('must have required property');
  });

  test('it should validate when email does not exist in database', async () => {
    const userCredentials = { ...ADMIN_USER, email: 'david123@wolox.com.co' };
    const { statusCode, body } = await api.post('/users/sessions').send(userCredentials);
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual(AUTH_ERROR);
  });

  test('it should validate when the db is down', async () => {
    const mock = jest.spyOn(User, 'findOne');
    mock.mockImplementation(db.sequelize.close);

    const { statusCode, body } = await api.post('/users/sessions').send(ADMIN_USER);
    expect(statusCode).toEqual(503);
    expect(body.internal_code).toEqual(DATABASE_ERROR);
    mock.mockRestore();
  });
});
