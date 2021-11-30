const request = require('supertest');
const app = require('../../app');
const { UNAUTHORIZED } = require('../../app/constants/errors');
const { ADMIN, REGULAR } = require('../../app/constants/roles');
const { verifyJwt } = require('../../app/helpers/authentication');
const { NUMBER_USERS } = require('../constants');
const { generateUsers, USER, CREDENTIALS } = require('../factory/factory_users');

const api = request(app);

describe('Sign up admin: POST /admin/users', () => {
  beforeEach(async () => {
    await generateUsers(NUMBER_USERS);
  });

  test('it should update user role', async () => {
    const { body: session } = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    const { body, statusCode } = await api
      .post('/admin/users')
      .send({ ...USER, email: CREDENTIALS.REGULAR_USER.email })
      .set({ Authorization: session.token });
    expect(statusCode).toEqual(200);
    expect(body.role).toEqual(ADMIN);
  });

  test('it should create a new user with admin role', async () => {
    const { body: session } = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    const { body, statusCode } = await api
      .post('/admin/users')
      .send({ ...USER, email: 'adminuser@wolox.co' })
      .set({ Authorization: session.token });
    expect(statusCode).toEqual(201);
    expect(body.role).toEqual(ADMIN);
  });

  test('it should check user permissions', async () => {
    const { body: session } = await api.post('/users/sessions').send(CREDENTIALS.REGULAR_USER);
    const { role } = verifyJwt(session.token);
    expect(role).toEqual(REGULAR);

    const { body, statusCode } = await api
      .post('/admin/users')
      .send(USER)
      .set({ Authorization: session.token });
    expect(statusCode).toEqual(403);
    expect(body.message).toEqual(UNAUTHORIZED);
  });

  test('it should validate email domain', async () => {
    const userData = { ...USER, email: 'david@gmail.com' };
    const { body, statusCode } = await api.post('/admin/users').send(userData);
    expect(statusCode).toEqual(400);
    expect(body.message[0].instancePath).toEqual('/email');
  });
});
