const { createUser, findUserByEmail, getUsers, updateUser } = require('../services/users');
const { info, error } = require('../logger');
const { userSerializer, listUsers } = require('../serializers/users');
const { signup: signupMapper } = require('../mappers/users');
const auth = require('../helpers/authentication');
const { authenticationError } = require('../errors');
const { AUTH_ERROR } = require('../constants/errors');
const { paginationReq } = require('../helpers/pagination');
const { ADMIN } = require('../constants/roles');

exports.signup = async (req, res, next) => {
  try {
    const password = await auth.hash(req.body.password);
    const userData = signupMapper({ ...req.body, password });
    const user = await createUser(userData);
    info(`User ${user.name} was created`);
    res.status(201).send(userSerializer(user));
  } catch (err) {
    error('Error creating user');
    next(err);
  }
};

exports.signupAdmin = async (req, res, next) => {
  try {
    const password = await auth.hash(req.body.password);
    const userData = signupMapper({ ...req.body, password, role: ADMIN });
    const userDB = await findUserByEmail(userData.email);
    const user = userDB ? await updateUser(userData, { email: userData.email }) : await createUser(userData);
    const statusCode = userDB ? 200 : 201;

    info(`Admin user ${user.name} was created`);
    res.status(statusCode).send(userSerializer(user));
  } catch (err) {
    error('Error creating admin user');
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

exports.getUsers = async (req, res, next) => {
  try {
    const { page, limit, offset } = paginationReq(req.query);
    const { users, count } = await getUsers(offset, limit);
    res.status(200).send(listUsers({ total: count, page, limit, users }));
  } catch (err) {
    error('Error getting list users');
    next(err);
  }
};
