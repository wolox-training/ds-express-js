const request = require('supertest');
const app = require('../../app');
const { AUTHENTICATION_ERROR } = require('../../app/errors');

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

  test('it should validate that the credentials are valid', async () => {
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
});
