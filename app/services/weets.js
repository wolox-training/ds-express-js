const axios = require('axios');

const { url } = require('../../config').common.weet;
const { defaultError } = require('../errors');

exports.getWeet = async (number, type = '') => {
  try {
    const response = await axios.get(`${url}/${number}/${type}`);
    return response.data;
  } catch (error) {
    return defaultError(error);
  }
};
