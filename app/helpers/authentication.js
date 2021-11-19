const bcrypt = require('bcrypt');
const bcryptConfig = require('../../config').common.bcrypt;

exports.hash = password => bcrypt.hash(password, parseInt(bcryptConfig.salt));

exports.compare = (password, hash) => bcrypt.compare(password, hash);
