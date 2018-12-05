// import errors from 'http-errors';
// import { getTokenFromHeader, decodeJWT } from '../util/token';
// import { INVALID_TOKEN } from '../util/messages';

export default (req, res, next) => {
  // const token = getTokenFromHeader(req);

  // Proceed to process the request when
  // there is a valid JWT token in the request header
  req.payload = {
    userId: 1,
    roleId: 2,
  };
  // if (decodeJWT(token)) {
  //   // req.authentcation
  //   next();
  // } else {
  //   res.json(errors.Unauthorized(INVALID_TOKEN));
  // }

  next();
};
