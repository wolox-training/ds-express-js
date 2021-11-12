const { requestError } = require('../errors');
const { validateSchema } = require('../helpers/validations');
const { findUserByEmail } = require('../services/users');

exports.validateRequest = schema => (req, res, next) => {
  const { valid, errors } = validateSchema(schema, req.body);
  if (!valid) return next(requestError(errors));
  return next();
};

exports.checkEmailExists = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) return next(requestError('Email already exists.'));
    return next();
  } catch (err) {
    return next(err);
  }
};
