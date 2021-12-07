const { factory } = require('factory-girl');
const { Weet } = require('../../app/models');

factory.define('Weet', Weet, {
  id: factory.sequence('Weet.id', id => id),
  content: factory.chance('sentence')
});

exports.generateWeets = () => {
  factory.resetSeq();
  factory.createMany('Weet', 10, {
    userId: 1
  });
};
