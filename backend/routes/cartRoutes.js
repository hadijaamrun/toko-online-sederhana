import express from 'express';
import { getCart, syncCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/sync', syncCart);

export default router;