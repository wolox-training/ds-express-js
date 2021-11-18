const bcrypt = require('bcrypt');
const bcryptConfig = require('../../config').common.bcrypt;

exports.hash = async password => {
  const hash = await bcrypt.hash(password, parseInt(bcryptConfig.salt));
  return hash;
};

exports.compare = async (password, hash) => {
  const valid = await bcrypt.compare(password, hash);
  return valid;
};
