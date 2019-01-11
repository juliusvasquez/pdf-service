import httpStatus from 'http-status';
import logger from './logger';

export default (server) => {
  server.on('NotFound', (req, res) => {
    res.send(
      httpStatus.NOT_FOUND,
      new Error('The requested resource could not be found', 'METHOD_NOT_IMPLEMENTED'),
    );
  });

  server.on('VersionNotAllowed', (req, res) => {
    res.send(
      httpStatus.NOT_FOUND,
      new Error('Unsupported API version requested', 'INVALID_VERSION'),
    );
  });

  server.on('InvalidVersion', (req, res) => {
    res.send(
      httpStatus.NOT_FOUND,
      new Error('Unsupported API version requested', 'INVALID_VERSION'),
    );
  });

  server.on('UnsupportedMediaType', (req, res) => {
    res.send(
      httpStatus.UNSUPPORTED_MEDIA_TYPE,
      new Error('Unsupported Media type requested', 'INVALID_MEDIA_TYPE'),
    );
  });

  server.on('MethodNotAllowed', (req, res) => {
    res.send(
      httpStatus.METHOD_NOT_ALLOWED,
      new Error('Method not implemented', 'METHOD_NOT_ALLOWED'),
    );
  });

  server.on('restifyError', (req, res, err) => {
    res.send(err);
  });

  server.on('uncaughtException', (req, res, route, err) => {
    logger.error('v *************  EXCEPTION EXCEPTION EXCEPTION  *****************v');
    logger.error('Uncaught exception:', err);
    logger.error(err.stack);
    logger.error('^ ***************************************************************^');
    res.send(
      httpStatus.INTERNAL_SERVER_ERROR,
      new Error('A runtime error has been logged. Request probably failed.'),
    );
  });

  // Handle any process-level errors
  process.on('uncaughtException', (err) => {
    logger.error('[Uncaught Exception]!', err);
    logger.error('A reply has probably not been sent to the client.');
    logger.error(err);
  });
  process.on('unhandledRejection', (error) => {
    logger.error('[Unhandled Rejection]', error);
    logger.error('A reply has probably not been sent to the client.');
  });
};
