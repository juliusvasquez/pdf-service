/**
 * @swagger
 * definitions:
 *  DefaultFailResponse:
 *    allOf:
 *      - $ref: '#/definitions/DefaultResponse'
 *      - properties:
 *          data: null
 *          status:
 *            type: string
 *            enum:
 *              - error
 *          path:
 *            type: string
 *          error:
 *            type: string
 */
function formatError(body, req) {
  return {
    code: body.code || body.statusCode,
    status: 'error',
    path: req.path,
    error: body.message,
  };
}

/**
 * @swagger
 * definitions:
 *  DefaultSuccessResponse:
 *    allOf:
 *      - $ref: '#/definitions/DefaultResponse'
 *      - properties:
 *          status:
 *            type: string
 *            enum:
 *              - success
 *
 *  DefaultSuccessWithPaginationResponse:
 *    allOf:
 *      - $ref: '#/definitions/DefaultSuccessResponse'
 *      - properties:
 *          pagination:
 *            type: {}
 *            description: 'NOTE: still need to work on the pagination structure, Placeholder only'
 */
function formatSuccess(body) {
  let response;
  const status = 'success';
  if (body.data && body.pagination) {
    response = {
      status,
      data: body.data,
      pagination: body.pagination,
    };
  } else {
    response = {
      status,
      data: body,
    };
  }
  return response;
}

/**
 * @swagger
 * definitions:
 *  DefaultResponse:
 *    type: object
 *    properties:
 *      status:
 *        type: string
 *        enum:
 *          - success
 *          - error
 *      data:
 *        type: object
 *        description: 'Any type, but unable to set due to openAPI v2 limitation'
 */
export default (body, req, res) => {
  // remove xpowered by on response
  res.setHeader('x-powered-by', 'adl');

  // Force to use the status code of the
  // body in the response status code
  if (body.statusCode) {
    res.statusCode = body.statusCode;
  }

  let response;
  if (body instanceof Error) {
    response = formatError(body, req);
  } else {
    response = formatSuccess(body);
  }
  return response;
};
