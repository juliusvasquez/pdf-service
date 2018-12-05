import express from 'express';
import mung from 'express-mung';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';
import appConfig from './conf/appConfig';
import routes from './routes';
import logger from './lib/logger';
import jsend from './lib/jsend';
import morganLogger from './middlewares/morganLogger';
import swaggerSetup from './middlewares/swaggerSetup';

const server = express();

// Configure server to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Middleware to standardize the response
server.use(mung.json(jsend));

// Middleware to integrate morgan to the default logger
server.use(morganLogger);

// Add swagger documentation
swaggerSetup(server);

// Load all routes
routes(server);

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

// Catch the unhandled rejections
process.on('unhandledRejection', (error) => {
  logger.error(`[Unhandled Rejection] - ${error}`);
});
