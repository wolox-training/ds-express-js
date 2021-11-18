const bcrypt = require('bcrypt');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { users: User } = require('../models');

exports.signup = async user => {
  try {
    const password = await bcrypt.hash(user.password, 10);
    const { dataValues } = await User.create({ ...user, password });
    return dataValues;
  } catch (error) {
    logger.error(error.message);
    throw databaseError('Error creating user in db');
  }
};

exports.findUserByEmail = async email => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    logger.error(error.message);
    throw databaseError('Error searching user in db');
  }
};
