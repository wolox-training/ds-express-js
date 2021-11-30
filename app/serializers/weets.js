const { pageSerializer } = require('./pagination');

exports.weetSerializer = weet => ({
  id: weet.id,
  user_id: weet.userId,
  content: weet.content
});

exports.listWeets = ({ total, page, limit, weets }) => {
  const weetList = weets.map(weet => this.weetSerializer(weet));
  return pageSerializer({ weets: weetList }, { total, page, limit });
};
