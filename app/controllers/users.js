const { signup, findUserByEmail } = require('../services/users');
const { info, error } = require('../logger');
const { userSerializer } = require('../serializers/users');
const { signup: signupMapper } = require('../mappers/users');
const auth = require('../helpers/authentication');
const { authenticationError } = require('../errors');
const { AUTH_ERROR } = require('../constants/errors').responses;

exports.signup = async (req, res, next) => {
  try {
    const password = await auth.hash(req.body.password);
    const userData = signupMapper({ ...req.body, password });
    const user = await signup(userData);
    info(`User ${user.name} was created`);
    res.status(201).send(userSerializer(user));
  } catch (err) {
    error('Error creating user');
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    const auhtError = () => authenticationError(AUTH_ERROR);

    if (!user) throw auhtError();
    const validPassword = await auth.compare(password, user.password);
    if (!validPassword) throw auhtError();

    const token = auth.getJwt(userSerializer(user));
    info('User logged in successfully');
    res.status(200).send({ token });
  } catch (err) {
    error('User login error');
    next(err);
  }
};
