import restify, { plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import figlet from 'figlet';
import versioning from './middlewares/versioning';
import appConfig from './conf/appConfig';
import routes from './conf/routes';
import logger from './lib/logger';
import jsend from './lib/jsend';
import errorHandler from './lib/errorHandler';
import morganLogger from './middlewares/morganLogger';
import swaggerSetup from './middlewares/swaggerSetup';

/*
 *  Prepare the RESTIFY server.
 *    - sets up all of the default headers for the system.
 *    - parse form submissions (e.g. multipart-form).
 *    - compress responses so they are smaller.
 */
const server = restify.createServer({
  name: appConfig.app.name,
  formatters: {
    'application/json': jsend,
  },
});
swaggerSetup(server);

/*
 *  Support CORS to allow cross domain access.
 * See https://github.com/TabDigital/restify-cors-middleware
 */
const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  // origins: ['http://api.myapp.com', 'http://web.myapp.com', 'http://127.0.0.1', 'http://localhost:8080', 'http://localhost:3000' ],
  origins: ['*'],
  // allowHeaders: ['API-Token', 'Authorization'],
  // exposeHeaders: ['API-Token-Expiry']
  allowHeaders: ['*'],
  exposeHeaders: ['*'],
});
server.pre(cors.preflight);
server.use(cors.actual);

server.pre(restify.pre.sanitizePath());
server.pre(versioning({ prefix: appConfig.app.basePath }));

server.use(plugins.fullResponse());
server.use(plugins.queryParser({ mapParams: true }));
server.use(plugins.bodyParser({ mapParams: true }));
server.use(plugins.gzipResponse());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());

// Middleware to integrate morgan to the default logger
server.use(morganLogger);

// Load all routes
routes(server);

// Error handling
errorHandler(server);

/*
 *  Display a nice banner.
 *  See https://www.npmjs.com/package/figlet
 */
logger.info(
  `\n${figlet.textSync(`${appConfig.app.name}`, {
    horizontalLayout: 'fitted',
  })}`,
);

// Listen on provided port, on all network interfaces.
server
  .listen(appConfig.app.port, '0.0.0.0', () => logger.info(`${appConfig.app.name} server is running on port: ${appConfig.app.port}`))

  // Event listener for server "error" event
  .on('error', (error) => {
    switch (error.code) {
      case 'EACCES':
        logger.error(`${appConfig.app.port} requires elevated privileges1`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${appConfig.app.port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
