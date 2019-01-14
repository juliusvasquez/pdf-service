import joi from 'joi';

export default {
  query: joi.object({
    url: joi
      .string()
      .uri()
      .required(),
    landscape: joi.string().optional(),
    format: joi.string().optional(),
    width: [joi.string().optional(), joi.number().optional()],
    height: [joi.string().optional(), joi.number().optional()],
    marginTop: [joi.string().optional(), joi.number().optional()],
    marginBottom: [joi.string().optional(), joi.number().optional()],
    marginLeft: [joi.string().optional(), joi.number().optional()],
    marginRight: [joi.string().optional(), joi.number().optional()],
  }),
};
