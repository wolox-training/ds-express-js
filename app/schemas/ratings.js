const { INVALID_SCORE } = require('../constants/errors');

exports.scoreSchema = {
  type: 'object',
  properties: {
    score: {
      type: 'integer',
      enum: [-1, 1],
      errorMessage: {
        enum: INVALID_SCORE
      }
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
