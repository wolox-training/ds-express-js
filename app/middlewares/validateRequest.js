const { requestError, invalidUser } = require('../errors');
const { validateSchema } = require('../helpers/validations');
const { findUserByEmail } = require('../services/users');

exports.validateRequest = (schema, requestType) => (req, _, next) => {
  const { valid, errors } = validateSchema(schema, req[requestType]);
  if (!valid) return next(requestError(errors));
  return next();
};

exports.checkEmailExists = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) return next(invalidUser('Email already exists.'));
    return next();
  } catch (err) {
    return next(err);
  }
};
