const logger = require('../logger');
const { getWeet, createWeet } = require('../services/weets');
const { getRandomInt, MIN, MAX } = require('../helpers/number');
const { weetMapper } = require('../mappers/weets');
const { defaultError } = require('../errors');
const { CHARACTER_LIMIT } = require('../constants/weets');
const { CHARACTER_LIMIT_ERROR } = require('../constants/errors');

exports.createWeet = async (req, res, next) => {
  try {
    const weetContent = await getWeet(getRandomInt(MIN, MAX));
    const { id: userId } = req.payload;
    if (weetContent.length > CHARACTER_LIMIT) throw defaultError(CHARACTER_LIMIT_ERROR);

    const weet = await createWeet(weetMapper(userId, weetContent));
    logger.info('Weet was created successfully');
    res.status(201).send(weet);
  } catch (error) {
    logger.error('Error creating weet');
    next(error);
  }
};
