const request = require('supertest');
const app = require('../../app');
const { REQUEST_ERROR } = require('../../app/errors');
const { NUMBER_USERS, WEETS } = require('../constants');
const { CREDENTIALS, generateUsers } = require('../factory/factory_users');
const { generateWeets } = require('../factory/factory_weets');

const api = request(app);

describe('Weet list: GET /weets', () => {
  let jwt = '';
  beforeEach(async () => {
    await generateUsers(NUMBER_USERS);
    await generateWeets(WEETS.TOTAL);
    const session = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    jwt = session.body.token;
  });

  test('it should validate the list of weets', async () => {
    const { statusCode, body } = await api.get('/weets').set({ Authorization: jwt });
    expect(statusCode).toEqual(200);
    expect(body).toEqual(
      expect.objectContaining({
        current_page: expect.any(Number),
        total_count: expect.any(Number),
        total_pages: expect.any(Number),
        weets: expect.any(Array)
      })
    );
    expect(body.weets).toHaveLength(WEETS.DEFAULT_LIMIT);
  });

  test('it should fail due to invalid query', async () => {
    const { statusCode, body } = await api.get('/weets?pages=1').set({ Authorization: jwt });
    expect(statusCode).toEqual(400);
    expect(body.internal_code).toEqual(REQUEST_ERROR);
  });

  test(`it should return ${WEETS.CUSTOM_LIMIT} items per page`, async () => {
    const { statusCode, body } = await api
      .get(`/weets?limit=${WEETS.CUSTOM_LIMIT}`)
      .set({ Authorization: jwt });
    expect(statusCode).toEqual(200);
    expect(body.weets).toHaveLength(WEETS.CUSTOM_LIMIT);
  });
});
