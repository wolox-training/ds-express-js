const request = require('supertest');
const app = require('../../app');
const { USER } = require('../factory/factory_users');

const api = request(app);

describe('Sign up: POST /users', () => {
  test('User sign up successfully', async () => {
    const { statusCode } = await api.post('/users').send(USER);
    expect(statusCode).toEqual(201);
  });

  test('Email already exists', async () => {
    await api.post('/users').send(USER);
    const { body, statusCode } = await api.post('/users').send(USER);
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual('Email already exists.');
  });

  test('Validate email domain', async () => {
    const userData = { ...USER, email: 'david@gmail.com' };
    const { body, statusCode } = await api.post('/users').send(userData);
    expect(statusCode).toEqual(400);
    expect(body.message[0].instancePath).toEqual('/email');
    expect(body.message[0].keyword).toEqual('errorMessage');
  });

  test('Validate password', async () => {
    const userData = { ...USER, password: '123' };
    const { body, statusCode } = await api.post('/users').send(userData);
    expect(statusCode).toEqual(400);
    expect(body.message[0].message).toEqual('must NOT have fewer than 8 characters');
  });

  test('Validate mandatory parameters', async () => {
    const { body, statusCode } = await api.post('/users').send({});
    expect(statusCode).toEqual(400);
    expect(body.message[0].message).toMatch('must have required property');
  });
});
