import semver from 'semver';
import errors from 'restify-errors';

export default (options) => {
  options = options || {};

  options.prefix = options.prefix || '';

  return (req, res, next) => {
    req.originalUrl = req.url;

    req.url = req.url.replace(`${options.prefix}/`, '/');

    const pieces = req.url.replace(/^\/+/, '').split('/');
    let version = pieces[0];

    const startsWithVersion = req.originalUrl.startsWith(`${options.prefix}/v`);

    // version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3');
    // version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0');
    version = version.replace(/v(\d{1})/, '$1.0.0');

    if (startsWithVersion) {
      if (semver.valid(version)) {
        req.url = req.url.substr(pieces[0].length + 1);
        req.headers = req.headers || [];
        req.headers['accept-version'] = version;
      } else {
        return next(new errors.InvalidVersionError('This is an invalid version'));
      }
    }
    return next();
  };
};
