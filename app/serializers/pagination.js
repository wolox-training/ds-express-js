exports.pageSerializer = (data, { total, page, limit }) => ({
  ...data,
  total_count: total,
  current_page: parseInt(page),
  total_pages: Math.ceil(total / limit)
});
