import jwt from 'jsonwebtoken';

export const getTokenFromHeader = (req) => {
  const authorization = req.header('authorization');
  const parts = authorization.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    const pattern = new RegExp('^Bearer$', 'i');
    // Test if the supplied header token type is valid
    // If valid, return the access token
    if (pattern.test(scheme)) {
      return credentials;
    }
  }
  return '';
};

export const decodeJWT = token => jwt.decode(token) !== null;
