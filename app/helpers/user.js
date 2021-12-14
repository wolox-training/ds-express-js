const { POSITIONS } = require('../constants/users');

exports.getPosition = score => {
  if (score < 5) {
    return POSITIONS.DEVELOPER;
  } else if (score < 10) {
    return POSITIONS.LEAD;
  } else if (score < 20) {
    return POSITIONS.TL;
  } else if (score < 30) {
    return POSITIONS.EM;
  } else if (score < 50) {
    return POSITIONS.HEAD;
  }
  return POSITIONS.CEO;
};
