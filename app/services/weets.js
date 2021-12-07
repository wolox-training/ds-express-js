const axios = require('axios');
const logger = require('../logger');
const { Weet } = require('../models');
const { url } = require('../../config').common.weet;
const { GET_WEET_ERROR } = require('../constants/errors');
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

exports.createWeet = async weet => {
  try {
    const { dataValues } = await Weet.create(weet);
    return dataValues;
  } catch (error) {
    logger.error(error);
    throw databaseError('Error creating weet in db');
  }
};
