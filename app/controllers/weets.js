const logger = require('../logger');
const { getWeet, getWeets, createWeet, findWeet } = require('../services/weets');
const { getRandomInt } = require('../helpers/number');
const { weetMapper, ratingMapper } = require('../mappers/weets');
const { defaultError, requestError } = require('../errors');
const { CHARACTER_LIMIT, MIN, MAX } = require('../constants/weets');
const { CHARACTER_LIMIT_ERROR, WEET_NOT_FOUND } = require('../constants/errors');
const { weetSerializer, listWeets } = require('../serializers/weets');
const { paginationReq } = require('../helpers/pagination');
const { rateWeet } = require('../services/ratings');

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

exports.rateWeet = async (req, res, next) => {
  try {
    const rating = ratingMapper(req.payload.id, req.params.id, req.body.score);
    const weet = await findWeet({ id: req.params.id });
    if (!weet) throw requestError(WEET_NOT_FOUND);

    const ratingDB = await rateWeet(rating, weet.userId);
    res.status(201).send(ratingDB);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
