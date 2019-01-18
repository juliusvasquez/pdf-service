import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-restify';
import { plugins } from 'restify';
import swaggerOptions from '../conf/swagger';

export default (server) => {
  const swaggerDocument = swaggerJSDoc(swaggerOptions);
  server.get('/api-docs/*', swaggerUI.serve);
  server.get(
    '/api-docs',
    plugins.conditionalHandler([
      {
        version: '1.0.0',
        handler: swaggerUI.setup(swaggerDocument, {
          explorer: true,
          baseURL: './api-docs',
        }),
      },
    ]),
  );
};
