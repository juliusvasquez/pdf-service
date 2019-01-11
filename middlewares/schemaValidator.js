import _ from 'lodash';
import errors from 'http-errors';
import Joi from 'joi';
// enabled HTTP methods for request data validation
const _withReqBodyMethods = ['post', 'put'];

// Joi validation options
const _validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

export default schema => (req, res, next) => {
  if (schema) {
    const method = req.method.toLowerCase();

    // get schema for the current route
    if (schema) {
      let reqData = req.query;
      if (_.includes(_withReqBodyMethods, method)) {
        reqData = req.body;
      }

      // Validate req.body using the schema and validation options
      try {
        return Joi.validate(reqData, schema, _validationOptions, (err, data) => {
          if (err) {
            // Joi Error
            const errDetails = _.map(err.details, ({ message, type }) => ({
              message: message.replace(/['"]/g, ''),
              type,
            }));
            next(errors.UnprocessableEntity(errDetails));
          } else {
            // Replace req.body with the data after Joi validation
            req.body = data;

            if (_.includes(_withReqBodyMethods, method)) {
              req.body = data;
            } else {
              req.query = data;
            }

            next();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return next();
};
