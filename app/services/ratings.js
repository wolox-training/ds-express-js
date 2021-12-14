const logger = require('../logger');
const { databaseError } = require('../errors');
const { Rating, User, sequelize } = require('../models');

exports.rateWeet = async (rating, ownerId) => {
  let transaction = {};
  try {
    transaction = await sequelize.transaction();
    const { ratingUserId, weetId, score } = rating;
    const ratingDB = await Rating.findOne({ where: { ratingUserId, weetId } });
    const ratingId = ratingDB && ratingDB.dataValues.id;
    const prevScore = ratingDB ? ratingDB.dataValues.score : 0;
    const [result] = await Rating.upsert({ id: ratingId, ...rating }, { transaction });

    const ownerUser = await User.findOne({ where: { id: ownerId } });
    const currentScore = prevScore === 0 ? score : score * 2;
    const newScore = prevScore === score ? ownerUser.score : ownerUser.score + currentScore;
    await ownerUser.update({ score: newScore }, { transaction });

    await transaction.commit();
    return result.dataValues;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(error);
    throw databaseError('Error when rating the weet');
  }
};
