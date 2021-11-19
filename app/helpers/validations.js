const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');
const { error } = require('../logger');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

exports.validateSchema = (schema, data) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) error('Error validating the schema: ', validate.errors);
  return { valid, errors: validate.errors };
};
