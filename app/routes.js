const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const { validateRequest, checkEmailExists } = require('./middlewares/validateRequest');
const { signup } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateRequest(signup), checkEmailExists], users.signup);
};
