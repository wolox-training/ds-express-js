const logger = require('../logger');
const { getWeet, createWeet } = require('../services/weets');
const { getRandomInt } = require('../helpers/number');
const { weetMapper } = require('../mappers/weets');
const { defaultError } = require('../errors');
const { CHARACTER_LIMIT, MIN, MAX } = require('../constants/weets');
const { CHARACTER_LIMIT_ERROR } = require('../constants/errors');
const { weetSerializer } = require('../serializers/weets');

exports.createWeet = async (req, res, next) => {
  try {
    const weetContent = await getWeet(getRandomInt(MIN, MAX));
    const { id: userId } = req.payload;
    if (weetContent.length > CHARACTER_LIMIT) throw defaultError(CHARACTER_LIMIT_ERROR);

    const weet = await createWeet(weetMapper(userId, weetContent));
    logger.info('Weet was created successfully');
    res.status(201).send(weetSerializer(weet));
  } catch (error) {
    logger.error('Error creating weet');
    next(error);
  }
};
