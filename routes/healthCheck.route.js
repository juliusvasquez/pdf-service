import healthCheckController from '../controllers/healthcheck.controller';

export default (server) => {
  server.get('/healthCheck', healthCheckController.getServerHealth);
};
