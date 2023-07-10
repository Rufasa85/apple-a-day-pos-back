import express from 'express';

import customerRoutes from './customerRoutes.js';
import itemRoutes from './itemRoutes.js';
import orderRoutes from './orderRoutes.js';
import shiftRoutes from './shiftRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/customers', customerRoutes);
router.use('/items', itemRoutes);
router.use('/orders', orderRoutes);
router.use('/shifts', shiftRoutes);
router.use('/users', userRoutes);

export default router;
