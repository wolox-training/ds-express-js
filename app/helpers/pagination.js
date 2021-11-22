exports.paginationReq = query => {
  const { page = 1, limit = 10 } = query;
  const offset = (page - 1) * limit;
  return { offset, limit, page };
};

exports.paginationData = ({ total, page, limit }) => ({
  total_count: total,
  current_page: parseInt(page),
  total_pages: Math.ceil(total / limit)
});
