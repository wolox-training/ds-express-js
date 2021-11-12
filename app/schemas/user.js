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
    email: {
      type: 'string',
      format: 'email',
      pattern: '@wolox.(com(.ar|.co|.cl|)|ar|co|cl)$'
    },
    password: {
      type: 'string',
      pattern: '^\\w+$',
      minLength: 8
    }
  },
  required: ['name', 'last_name', 'email', 'password'],
  additionalProperties: false
};
