const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.REQUEST_ERROR = 'request_error';
exports.requestError = message => internalError(message, exports.REQUEST_ERROR);

exports.REQUEST_ERROR = 'invalid_user';
exports.invalidUser = message => internalError(message, exports.REQUEST_ERROR);

exports.AUTHENTICATION_ERROR = 'authentication_error';
exports.authenticationError = message => internalError(message, exports.AUTHENTICATION_ERROR);

exports.UNAUTHORIZED_ERROR = 'unauthorized_error';
exports.unauthorizedError = message => internalError(message, exports.UNAUTHORIZED_ERROR);
