const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const { validateRequest, checkEmailExists } = require('./middlewares/validateRequest');
const { signupSchema, signinSchema } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateRequest(signupSchema), checkEmailExists], users.signup);
  app.post('/users/sessions', [validateRequest(signinSchema)], users.signin);
};
