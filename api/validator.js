import joi from 'joi';

const webpageToPdf = {
  query: joi.object({
    url: joi
      .string()
      .uri()
      .required(),
  }),
};

export default {
  webpageToPdf,
};
