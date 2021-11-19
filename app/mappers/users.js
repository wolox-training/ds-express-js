const { capitalize } = require('../helpers/text');

exports.signup = user => ({
  name: capitalize(user.name),
  lastName: capitalize(user.last_name),
  email: user.email.trim().toLowerCase(),
  password: user.password
});
