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
export const generatePdfSchema = joi.object({
  content: joi.string().required(),
  fileName: joi.string().required(),
});

export default {};
