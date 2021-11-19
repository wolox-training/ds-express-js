exports.userSerializer = user => ({
  id: user.id,
  name: user.name,
  last_name: user.lastName,
  email: user.email
});
