const axios = require('axios');
const logger = require('../logger');
const { Weet } = require('../models');
const { url } = require('../../config').common.weet;
const { GET_WEET_ERROR, GET_WEET_DB_ERROR, ERROR_SEARCHING_TWEET } = require('../constants/errors');
const { databaseError, unavailableError } = require('../errors');

exports.getWeet = async (number, type = '') => {
  try {
    const response = await axios.get(`${url}/${number}/${type}`);
    return response.data;
  } catch (error) {
    logger.error(error);
    throw unavailableError(GET_WEET_ERROR);
  }
};

exports.findWeet = async params => {
  try {
    const weet = await Weet.findOne({ where: params });
    return weet && weet.dataValues;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(ERROR_SEARCHING_TWEET);
  }
};

exports.getWeets = async (offset, limit) => {
  try {
    const { rows, count } = await Weet.findAndCountAll({ limit, offset });
    return { weets: rows, count };
  } catch (error) {
    logger.error(error);
    throw databaseError(GET_WEET_DB_ERROR);
  }
};

exports.createWeet = async weet => {
  try {
    const { dataValues } = await Weet.create(weet);
    return dataValues;
  } catch (error) {
    logger.error(error);
    throw databaseError('Error creating weet in db');
  }
};
