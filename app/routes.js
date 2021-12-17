const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const weets = require('./controllers/weets');
const { ADMIN } = require('./constants/roles');
const { validateToken, validateRole } = require('./middlewares/auth');
const { validateRequest, checkEmailExists } = require('./middlewares/validateRequest');
const { paginationSchema } = require('./schemas/pagination');
const { signupSchema, signinSchema } = require('./schemas/user');
const { PARAMETER_TYPE } = require('./constants/schemas');
const { scoreSchema, weetId } = require('./schemas/ratings');

const { BODY, PARAMS, QUERY } = PARAMETER_TYPE;

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateToken, validateRequest(paginationSchema, QUERY)], users.getUsers);
  app.post('/users', [validateRequest(signupSchema, BODY), checkEmailExists], users.signup);
  app.post('/users/sessions', [validateRequest(signinSchema, BODY)], users.signin);
  app.post('/users/sessions/invalidate_all', [validateToken], users.logout);

  app.post(
    '/admin/users',
    [validateRequest(signupSchema, BODY), validateToken, validateRole(ADMIN)],
    users.signupAdmin
  );

  app.get('/weets', [validateToken, validateRequest(paginationSchema, QUERY)], weets.getWeets);
  app.post('/weets', [validateToken], weets.createWeet);
  app.post(
    '/weets/:id/ratings',
    [validateToken, validateRequest(scoreSchema, BODY), validateRequest(weetId, PARAMS)],
    weets.rateWeet
  );
};
