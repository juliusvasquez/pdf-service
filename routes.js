import errors from 'http-errors';
import _ from 'lodash';
import route from './api/route';
import jsend from './lib/jsend';

export default (app) => {
  // All specific routes here
  app.use('/api/1.0/', route);

  // Handling 404 Error
  app.use((req, res, next) => {
    next(errors.NotFound('The requested resource could not be found.'));
  });

  // 500 - Any server error
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json(jsend(err, req, res));
    next();
  });

  // 405 - Any methods in all routes that are not allowed;
  _.map(app._router.stack, (middleware) => {
    if (middleware.name === 'router') {
      _.map(middleware.handle.stack, (childRoute) => {
        childRoute.route.all((req, res, next) => next(errors.MethodNotAllowed(`Method ${req.method} is not allowed.`)));
      });
    }
  });
};
