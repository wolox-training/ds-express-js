const { signup } = require('../services/users');
const { info, error } = require('../logger');
const { signup: response } = require('../serializers/users');
const { signup: signupMapper } = require('../mappers/users');
const auth = require('../helpers/authentication');

exports.signup = async (req, res, next) => {
  try {
    const password = await auth.hash(req.body.password);
    const userData = signupMapper({ ...req.body, password });
    const user = await signup(userData);
    info(`User ${user.name} was created`);
    res.status(201).send(response(user));
  } catch (err) {
    error('Error creating user');
    next(err);
  }
};
