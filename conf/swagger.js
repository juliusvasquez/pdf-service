import appConfig from './appConfig';

const { app } = appConfig;

export default {
  swaggerDefinition: {
    openapi: '2.0',
    info: {
      title: 'Report Service API',
      description: 'API collections and documentation related to report service',
      version: '1.0',
    },
    host: `${app.host}:${app.port}`,
    basePath: '/api/v1',
    schemes: ['http', 'https'],
  },
  apis: ['./swagger/**/*.yaml'], // Path to the API docs
};
