const logger = require('../logger');
const { TOKEN_NOT_PROVIDED, UNAUTHORIZED } = require('../constants/errors');
const { authenticationError, unauthorizedError } = require('../errors');
const { verifyJwt } = require('../helpers/authentication');

exports.validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next(authenticationError(TOKEN_NOT_PROVIDED));
    const decoded = verifyJwt(token);
    req.payload = decoded;
    return next();
  } catch (error) {
    logger.error('Authentication error');
    return next(authenticationError(error.message));
  }
};

exports.validateRole = role => (req, res, next) => {
  const { role: userRole } = req.payload;
  if (userRole !== role) return next(unauthorizedError(UNAUTHORIZED));
  return next();
};
