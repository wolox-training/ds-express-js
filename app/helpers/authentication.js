const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { bcrypt: bcryptConfig, jwt: jwtConfig } = require('../../config').common;

exports.hash = async password => {
  const hash = await bcrypt.hash(password, parseInt(bcryptConfig.salt));
  return hash;
};

exports.compare = async (password, hash) => {
  const valid = await bcrypt.compare(password, hash);
  return valid;
};

exports.getJwt = payload => {
  const token = jwt.sign(payload, jwtConfig.privateKey, { expiresIn: jwtConfig.expiresIn });
  return token;
};
