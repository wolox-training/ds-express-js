const logger = require('../logger');
const { databaseError } = require('../errors');
const { users: User } = require('../models');

exports.createUser = async user => {
  try {
    const { dataValues } = await User.create(user);
    return dataValues;
  } catch (error) {
    logger.error(error.message);
    throw databaseError('Error creating user in db');
  }
};

exports.updateUser = async (user, fields) => {
  try {
    const [, users] = await User.update(user, { where: fields, returning: true });
    const { dataValues } = users[0];
    return dataValues;
  } catch (error) {
    logger.error(error.message);
    throw databaseError('Error updating user in db');
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

exports.getUsers = async (offset, limit) => {
  try {
    const { rows, count } = await User.findAndCountAll({
      attributes: { exclude: ['password'] },
      limit,
      offset
    });
    return { users: rows, count };
  } catch (error) {
    logger.error(error.message);
    throw databaseError('Error getting users in db');
  }
};
