import express from 'express';
const router = express.Router();
import { getPrivateData } from '../controllers/private';
import { Protect } from '../middlewares/auth';

router.get('/', Protect, getPrivateData);
export default router;