import express from 'express';

import customerRoutes from './customerRoutes.js';
import itemRoutes from './itemRoutes.js';
import orderRoutes from './orderRoutes.js';
import shiftRoutes from './shiftRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/customer', customerRoutes);
router.use('/item', itemRoutes);
router.use('/order', orderRoutes);
router.use('/shift', shiftRoutes);
router.use('/user', userRoutes);

export default router;
