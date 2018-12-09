import express from 'express';
import controller from './controller';
import schemaValidator from '../middlewares/schemaValidator';
import { generateFromHTMLSchema } from './validator';

const router = express.Router();

router.route('/generate').post(schemaValidator(generateFromHTMLSchema), controller.generate);

export default router;
