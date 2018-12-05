import express from 'express';
import controller from './controller';
import schemaValidator from '../middlewares/schemaValidator';
import { generatePdfSchema } from './validator';

const router = express.Router();

router.route('/generate').post(schemaValidator(generatePdfSchema), controller.generatePdf);

export default router;
