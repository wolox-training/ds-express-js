exports.weetMapper = (userId, weetContent) => ({
  userId,
  content: weetContent
});

exports.ratingMapper = (userId, weetId, score) => ({
  ratingUserId: userId,
  weetId: Number(weetId),
  score
});
