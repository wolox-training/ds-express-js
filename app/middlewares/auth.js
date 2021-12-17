const logger = require('../logger');
const { TOKEN_NOT_PROVIDED, UNAUTHORIZED, TOKEN_EXPIRED } = require('../constants/errors');
const { authenticationError, unauthorizedError } = require('../errors');
const { verifyJwt } = require('../helpers/authentication');
const { findUserByEmail } = require('../services/users');

exports.validateToken = async (req, res, next) => {
  try {
    const MILLISECONDS = 1000;
    const token = req.headers.authorization;
    if (!token) return next(authenticationError(TOKEN_NOT_PROVIDED));
    const decoded = verifyJwt(token);
    req.payload = decoded;
    const user = await findUserByEmail(decoded.email);
    const jwtCreationDate = new Date(decoded.iat * MILLISECONDS);
    if (jwtCreationDate < user.dataValues.minToken) {
      return next(authenticationError(TOKEN_EXPIRED));
    }
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
