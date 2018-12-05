const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

export default (app) => {
  // add swagger definitions
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'ADL API Documentation', // Title (required)
        version: '1.0', // Version (required)
      },
      basePath: '/api/1.0',
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [
      './lib/jsend.js',
      './controllers/*.controller.js',
      './schemas/**/*.schema.js',
      './controllers/*.yml',
      './routes/*.route.js',
      './routes/*.yml',
    ], // Path to the API docs
  };

  const swaggerDocument = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { showExplorer: true }));
};
