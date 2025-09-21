import express from 'express';
import { getConstants } from '../controllers/constantsController.js';

const router = express.Router();


router.get('/getConstants', getConstants);

export default router;