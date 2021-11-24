const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { bcrypt: bcryptConfig, jwt: jwtConfig } = require('../../config').common;

exports.hash = password => bcrypt.hash(password, parseInt(bcryptConfig.salt));

exports.compare = (password, hash) => bcrypt.compare(password, hash);

exports.getJwt = payload => jwt.sign(payload, jwtConfig.privateKey, { expiresIn: jwtConfig.expiresIn });
