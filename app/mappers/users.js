const { capitalize } = require('../helpers/text');

exports.signup = user => ({
  ...user,
  name: capitalize(user.name),
  lastName: capitalize(user.last_name),
  email: user.email.trim().toLowerCase()
});
