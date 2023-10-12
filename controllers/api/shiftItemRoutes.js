import express from 'express';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// import all models to easily manipulate includes
// remove unused models before deployment
import { Customer, Order, Shift, Item, ShiftItem } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// GET all shiftItems
router.get('/', apiAuth, async (req, res) => {
	try {
		const shiftItems = await ShiftItem.findAll();
		if (!shiftItems.length) return res.status(404).json({ error: 'There are no shiftItems.' });

		return res.status(200).json(shiftItems);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// GET one shiftItem
router.get('/:id', async (req, res) => {
	try {
		const options = {
			include: { all: true }
		};

		const shiftItem = await ShiftItem.findByPk(req.params.id, options);
		if (!shiftItem) return res.status(404).json({ error: 'This shiftItem could not be found.' });

		return res.status(200).json(shiftItem);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// PUT update shiftItem
router.put('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { id: req.params.id }
		};

		const shiftItem = await ShiftItem.update(req.body, options);
		if (!shiftItem) return res.status(404).json({ error: 'This shiftItem could not be found.' });

		return res.status(200).json({ message: 'shiftItem updated!', shiftItem });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// DELETE shiftItem
router.delete('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { id: req.params.id }
		};

		const shiftItem = await ShiftItem.destroy(options);
		if (!shiftItem) return res.status(404).json({ error: 'This shiftItem could not be found.' });

		return res.status(200).json({ message: 'shiftItem deleted!', shiftItem });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

export default router;
