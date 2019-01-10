import express from 'express';
import controller from './controller';
import schemaValidator from '../middlewares/schemaValidator';
import { htmlPdfReportSchema } from './validator';

const router = express.Router();

router
  .route('/html-to-pdf')
  .post(schemaValidator(htmlPdfReportSchema), controller.generatePdfByHtmlReport);

export default router;
