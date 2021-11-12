const { signup } = require('../services/users');
const { info, error } = require('../logger');

exports.signup = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { id, password, ...user } = await signup(req.body);
    info(`User ${user.name} was created`);
    res.status(201).send(user);
  } catch (err) {
    error('Error creating user');
    next(error);
  }
};
