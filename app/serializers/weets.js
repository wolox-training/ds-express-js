const { pageSerializer } = require('./pagination');

exports.weetSerializer = weet => ({
  id: weet.id,
  user_id: weet.userId,
  content: weet.content
});

exports.listWeets = ({ total, page, limit, weets }) => {
  const users = weets.map(weet => this.weetSerializer(weet));
  return pageSerializer({ users }, { total, page, limit });
};
