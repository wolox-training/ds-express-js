const countryCodes = 'ar|co|cl';

exports.email = {
  type: 'string',
  format: 'email',
  pattern: `(@wolox.com|@wolox.(com.(${countryCodes})|${countryCodes}))$`,
  errorMessage: {
    pattern: 'The mail does not belong to Wolox domain'
  }
};

exports.password = {
  type: 'string',
  pattern: '^\\w+$',
  minLength: 8
};
