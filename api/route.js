// import express from 'express';
import { plugins } from 'restify';
import controller from './controller';
import validator from './validator';
import schemaValidator from '../middlewares/schemaValidator';
// import { htmlPdfReportSchema } from './validator';

// const router = express.Router();

// router
//   .route('/html-to-pdf')
//   .post(schemaValidator(htmlPdfReportSchema), controller.generatePdfByHtmlReport);

// export default router;
export default (server) => {
  server.get(
    '/webpage-to-pdf',
    schemaValidator(validator.webpageToPdf.query),
    plugins.conditionalHandler([
      { version: '1.0.0', handler: controller.generatePdfByWebpage },
      { version: '2.0.0', handler: controller.generatePdfByWebpage },
    ]),
  );
};
