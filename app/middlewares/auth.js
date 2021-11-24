const logger = require('../logger');
const { TOKEN_NOT_PROVIDED } = require('../constants/errors').responses;
const { authenticationError } = require('../errors');
const { verifyJwt } = require('../helpers/authentication');

exports.validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next(authenticationError(TOKEN_NOT_PROVIDED));
    verifyJwt(token);
    return next();
  } catch (error) {
    logger.error('Authentication error');
    return next(authenticationError(error.message));
  }
};
