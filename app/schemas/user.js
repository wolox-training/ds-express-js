const { email, password } = require('../constants/schemas');

exports.signup = {
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
