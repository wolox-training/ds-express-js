exports.scoreSchema = {
  type: 'object',
  properties: {
    score: {
      type: 'integer',
      enum: [-1, 1]
    }
  },
  required: ['score'],
  additionalProperties: false
};

exports.weetId = {
  type: 'object',
  properties: { id: { type: 'integer', minimum: 1 } },
  required: ['id'],
  additionalProperties: false
};
