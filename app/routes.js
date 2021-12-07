const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const weets = require('./controllers/weets');
const { ADMIN } = require('./constants/roles');
const { validateToken, validateRole } = require('./middlewares/auth');
const { validateBody, validateQuery, checkEmailExists } = require('./middlewares/validateRequest');
const { paginationSchema } = require('./schemas/pagination');
const { signupSchema, signinSchema } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateToken, validateQuery(paginationSchema)], users.getUsers);
  app.post('/users', [validateBody(signupSchema), checkEmailExists], users.signup);
  app.post('/users/sessions', [validateBody(signinSchema)], users.signin);

  app.post(
    '/admin/users',
    [validateBody(signupSchema), validateToken, validateRole(ADMIN)],
    users.signupAdmin
  );

  app.post('/weets', [validateToken], weets.createWeet);
};
