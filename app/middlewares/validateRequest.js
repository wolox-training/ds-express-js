const { requestError, invalidUser } = require('../errors');
const { validateSchema } = require('../helpers/validations');
const { findUserByEmail } = require('../services/users');

const validateRequest = (schema, requestType) => (req, _, next) => {
  const { valid, errors } = validateSchema(schema, req[requestType]);
  if (!valid) return next(requestError(errors));
  return next();
};

exports.validateBody = schema => validateRequest(schema, 'body');
exports.validateQuery = schema => validateRequest(schema, 'query');

exports.checkEmailExists = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) return next(invalidUser('Email already exists.'));
    return next();
  } catch (err) {
    return next(err);
  }
};
