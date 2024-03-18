import express from 'express';
import apiAuth from '../../middleware/apiAuth.js';
import { ShiftItem } from '../../models/index.js';

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

router.delete('/shiftitems/:id', apiAuth, async (req, res) => {
    //TODO: set as deleted in db, then hide from view.  
    return res.status(500).json({msg:"coming soon!"})
	// try {
	// 	console.log(req.params.id);
    //     const item = await ShiftItem.findByPk(req.params.id);
    //     console.log(item);
	// 	const deled = await  ShiftItem.destroy({
    //         where:{
    //             id:req.params.id
    //         }
    //     })
    //     console.log(deled)
	// 	return res.status(200).json({ message: 'deleted',deled});
	// } catch (error) {
	// 	console.log(error);
	// 	return res.status(500).json({ error });
	// }
});

export default router;
