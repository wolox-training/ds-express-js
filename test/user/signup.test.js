const request = require('supertest');
const app = require('../../app');

describe('Sign up: POST /users', () => {
  const user = {
    name: 'David',
    last_name: 'Sandoval',
    email: 'david@wolox.com.co',
    password: 'ABC12345678'
  };

  test('User sign up successfully', async () => {
    const { statusCode } = await request(app)
      .post('/users')
      .send(user);
    expect(statusCode).toEqual(201);
  });

  test('Email already exists', async () => {
    await request(app)
      .post('/users')
      .send(user);
    const { body, statusCode } = await request(app)
      .post('/users')
      .send(user);
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual('Email already exists.');
  });

  test('Validate email domain', async () => {
    const userData = { ...user, email: 'david@gmail.com' };
    const { body, statusCode } = await request(app)
      .post('/users')
      .send(userData);
    expect(statusCode).toEqual(400);
    expect(body.message[0].instancePath).toEqual('/email');
    expect(body.message[0].keyword).toEqual('pattern');
  });

  test('Validate password', async () => {
    const userData = { ...user, password: '123' };
    const { body, statusCode } = await request(app)
      .post('/users')
      .send(userData);
    expect(statusCode).toEqual(400);
    expect(body.message[0].message).toEqual('must NOT have fewer than 8 characters');
  });

  test('Validate mandatory parameters', async () => {
    const { body, statusCode } = await request(app)
      .post('/users')
      .send({});
    expect(statusCode).toEqual(400);
    expect(body.message[0].message).toMatch('must have required property');
  });
});
