const request = require('supertest');
const app = require('../../app');
const { AUTH_ERROR } = require('../../app/constants/errors').responses;
const { AUTHENTICATION_ERROR, DATABASE_ERROR } = require('../../app/errors');
const { users: User } = require('../../app/models');
const db = require('../../app/models');

describe('Sign in: POST /users/sessions', () => {
  const credentials = {
    email: 'david@wolox.com.co',
    password: 'ABC12345678'
  };

  const user = {
    name: 'David',
    last_name: 'Sandoval',
    ...credentials
  };

  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(user);
  });

  test('it should sign in successfully', async () => {
    const data = await request(app)
      .post('/users/sessions')
      .send(credentials);
    expect(data.statusCode).toEqual(200);
    expect(data.body).toHaveProperty('token');
  });

  test('it should not validate the user with invalid credentials', async () => {
    const userCredentials = { ...credentials, password: '12345678' };
    const { statusCode, body } = await request(app)
      .post('/users/sessions')
      .send(userCredentials);
    expect(statusCode).toEqual(401);
    expect(body.internal_code).toEqual(AUTHENTICATION_ERROR);
  });

  test('it should validate mandatory parameters', async () => {
    const { statusCode, body } = await request(app)
      .post('/users/sessions')
      .send();
    expect(statusCode).toEqual(400);
    expect(body.message[0].message).toMatch('must have required property');
  });

  test('it should validate when email does not exist in database', async () => {
    const userCredentials = { ...credentials, email: 'david123@wolox.com.co' };
    const { statusCode, body } = await request(app)
      .post('/users/sessions')
      .send(userCredentials);
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual(AUTH_ERROR);
  });

  test('it should validate when the db is down', async () => {
    const mock = jest.spyOn(User, 'findOne');
    mock.mockImplementation(db.sequelize.close);

    const { statusCode, body } = await request(app)
      .post('/users/sessions')
      .send(credentials);
    expect(statusCode).toEqual(503);
    expect(body.internal_code).toEqual(DATABASE_ERROR);
    mock.mockRestore();
  });
});
