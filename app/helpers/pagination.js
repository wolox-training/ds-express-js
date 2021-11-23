const { DEFAULT_PAGE, LIMIT } = require('../constants/pagination');

exports.paginationReq = query => {
  const { page = DEFAULT_PAGE, limit = LIMIT } = query;
  const offset = (page - 1) * limit;
  return { offset, limit, page };
};
