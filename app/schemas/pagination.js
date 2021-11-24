exports.paginationSchema = {
  type: 'object',
  properties: {
    page: {
      type: 'integer',
      minimum: 1
    },
    limit: {
      type: 'integer',
      minimum: 1
    }
  },
  additionalProperties: false
};
