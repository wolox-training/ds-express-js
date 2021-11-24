const { email, password } = require('../constants/schemas');

exports.signupSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    last_name: {
      type: 'string',
      minLength: 1
    },
    email,
    password
  },
  required: ['name', 'last_name', 'email', 'password'],
  additionalProperties: false
};

exports.signinSchema = {
  type: 'object',
  properties: {
    email,
    password
  },
  required: ['email', 'password'],
  additionalProperties: false
};
