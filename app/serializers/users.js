exports.userSerializer = user => ({
  id: user.id,
  name: user.name,
  last_name: user.lastName,
  email: user.email
});

exports.listUsers = ({ total, page, limit, users }) => ({
  users: users.map(user => this.userSerializer(user)),
  pagination: {
    total_count: total,
    current_page: parseInt(page),
    total_pages: Math.ceil(total / limit)
  }
});
