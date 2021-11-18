const { signup } = require('../services/users');
const { info, error } = require('../logger');
const { signup: response } = require('../serializers/users');
const { signup: userInfo } = require('../mappers/users');

exports.signup = async (req, res) => {
  try {
    const user = await signup(userInfo(req.body));
    info(`User ${user.name} was created`);
    res.status(201).send(response(user));
  } catch (err) {
    error('Error creating user');
    res.status(400).send(err);
  }
};
