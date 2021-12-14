const request = require('supertest');
const app = require('../../app');
const { WEET_NOT_FOUND, INVALID_SCORE } = require('../../app/constants/errors');
const { POSITIONS } = require('../../app/constants/users');
const { User, Weet } = require('../../app/models');
const { NUMBER_USERS, WEETS, RATINGS } = require('../constants');
const { CREDENTIALS, generateUsers } = require('../factory/factory_users');
const { generateWeets } = require('../factory/factory_weets');

const api = request(app);

describe('Rate weet: POST /weets/:id/rating', () => {
  let jwt = '';

  beforeEach(async () => {
    await generateUsers(NUMBER_USERS);
    await generateWeets(WEETS.TOTAL);
    const session = await api.post('/users/sessions').send(CREDENTIALS.ADMIN_USER);
    jwt = session.body.token;
  });

  test('it should return weet not found error', async () => {
    const weetId = 20;
    const { statusCode, body } = await api
      .post(`/weets/${weetId}/ratings`)
      .set({ Authorization: jwt })
      .send({ score: 1 });
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual(WEET_NOT_FOUND);
  });

  test('it should get invalid score error', async () => {
    const { statusCode, body } = await api
      .post(`/weets/${RATINGS.INVALID_WEET_ID}/ratings`)
      .set({ Authorization: jwt })
      .send({ score: RATINGS.INVALID_SCORE });
    expect(body.message[0].message).toEqual(INVALID_SCORE);
    expect(statusCode).toEqual(400);
  });

  test('it should update user score', async () => {
    const weetId = RATINGS.WEET_ID;
    const score = RATINGS.SCORE;
    const { statusCode } = await api
      .post(`/weets/${weetId}/ratings`)
      .set({ Authorization: jwt })
      .send({ score });
    const { dataValues: weetDB } = await Weet.findOne({ where: { id: weetId } });
    const { dataValues: ownerUser } = await User.findOne({ where: { id: weetDB.userId } });

    expect(statusCode).toEqual(201);
    expect(ownerUser.score).toEqual(score);
  });

  test('it should update user position', async () => {
    const weetId = RATINGS.WEET_ID;
    const score = RATINGS.SCORE;
    const { dataValues: weetDB } = await Weet.findOne({ where: { id: weetId } });
    const user = await User.findOne({ where: { id: weetDB.userId } });
    await user.update({ score: RATINGS.MAX_DEV_SCORE });
    expect(user.dataValues.position).toEqual(POSITIONS.DEVELOPER);

    const { statusCode } = await api
      .post(`/weets/${weetId}/ratings`)
      .set({ Authorization: jwt })
      .send({ score });

    const userUpdated = await User.findOne({ where: { id: weetDB.userId } });
    expect(statusCode).toEqual(201);
    expect(userUpdated.dataValues.position).toEqual(POSITIONS.LEAD);
  });
});
