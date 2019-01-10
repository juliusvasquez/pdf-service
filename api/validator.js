import joi from 'joi';

// /**
//  * @swagger
//  * definitions:
//  *  TestRequestDTO:
//  *    type: object
//  *    properties:
//  *      firstName:
//  *        type: string
//  *        required: true
//  *      lastName:
//  *        type: string
//  *        required: true
//  *
//  * parameters:
//  *  TestRequestDTOParameter:
//  *    in: body
//  *    name: body
//  *    description: Test Request Body that is used for testing
//  *    required: true
//  *    schema:
//  *      $ref: '#/definitions/TestRequestDTO'
//  */
export const htmlPdfReportSchema = joi.object({
  fileName: joi.strict().required(),
  options: joi
    .object({
      header: joi
        .string()
        .optional()
        .allow('', null),
      content: joi.string().required(),
      footer: joi
        .string()
        .optional()
        .allow('', null),
      document: joi.object({
        landscape: joi
          .boolean()
          .optional()
          .default(false),
        width: joi
          .string()
          .optional()
          .allow('', null),
        height: joi
          .string()
          .optional()
          .allow('', null),
        format: joi
          .string()
          .optional()
          .allow('', null),
        margin: joi
          .object({
            top: joi
              .string()
              .optional()
              .allow('', null),
            right: joi
              .string()
              .optional()
              .allow('', null),
            bottom: joi
              .string()
              .optional()
              .allow('', null),
            left: joi
              .string()
              .optional()
              .allow('', null),
          })
          .required(),
      }),
    })
    .required(),
});

export default {};
