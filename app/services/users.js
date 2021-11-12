const bcrypt = require('bcrypt');
const { databaseError } = require('../errors');
const { users: User } = require('../models');

exports.signup = async user => {
  try {
    const password = await bcrypt.hash(user.password, 10);
    const { dataValues } = await User.create({ ...user, password });
    return dataValues;
  } catch (error) {
    throw databaseError(error);
  }
};

exports.findUserByEmail = async email => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw databaseError(error);
  }
};
