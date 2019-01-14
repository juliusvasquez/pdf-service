import { plugins } from 'restify';
import pdfController from '../controllers/pdf.controller';
import webpageToPdfValidator from '../validators/webpageToPdf.validator';
import schemaValidator from '../middlewares/schemaValidator';

export default (server) => {
  server.get(
    '/webpage-to-pdf',
    schemaValidator(webpageToPdfValidator.query),
    plugins.conditionalHandler([{ version: '1.0.0', handler: pdfController.generatePdfByWebpage }]),
  );
};
