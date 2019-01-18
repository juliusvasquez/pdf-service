import joi from 'joi';

export default {
  /**
   * @swagger
   * parameters:
   *  WebpageToPdfRequestQuery:
   *    in: query
   *      name: url
   *      description: URL to navigate page to. The url should include scheme, e.g. https://
   *      required: true
   *      schema:
   *        type: string
   *        format: uri
   *    - in: query
   *      name: landscape
   *      description: Paper orientation. Defaults to **false**.
   *      required: false
   *      schema:
   *        type: string
   *    - in: query
   *      name: format
   *      description: >
   *        Paper format. If set, takes priority over width or height options.
   *        Defaults to **Letter**.
   *      required: false
   *      schema:
   *        type: string
   *    - in: query
   *      name: width
   *      description: Paper width, accepts values labeled with units.
   *      required: false
   *      schema:
   *        type: string
   *    - in: query
   *      name: height
   *      description: Paper height, accepts values labeled with units.
   *      required: false
   *      schema:
   *        type: string
   *    - in: query
   *      name: marginTop
   *      description:  Top margin, accepts values labeled with units.
   *      required: false
   *      schema:
   *        type: string
   *    - in: query
   *      name: marginBottom
   *      description:  Bottom margin, accepts values labeled with units.
   *      required: false
   *      schema:
   *        type: string
   *    - in: query
   *      name: marginLeft
   *      description:  Left margin, accepts values labeled with units.
   *      required: false
   *      schema:
   *        type: string
   *    - in: query
   *      name: marginRight
   *      description:  Right margin, accepts values labeled with units.
   *      required: false
   *      schema:
   *        type: string
   */
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
