const logger = require('../logger');
const { getWeet, getWeets, createWeet } = require('../services/weets');
const { getRandomInt, MIN, MAX } = require('../helpers/number');
const { weetMapper } = require('../mappers/weets');
const { defaultError } = require('../errors');
const { CHARACTER_LIMIT } = require('../constants/weets');
const { CHARACTER_LIMIT_ERROR } = require('../constants/errors');
const { weetSerializer, listWeets } = require('../serializers/weets');
const { paginationReq } = require('../helpers/pagination');

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

exports.getWeets = async (req, res, next) => {
  try {
    const { page, limit, offset } = paginationReq(req.query);
    const { weets, count } = await getWeets(offset, limit);
    res.status(200).send(listWeets({ total: count, page, limit, weets }));
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
