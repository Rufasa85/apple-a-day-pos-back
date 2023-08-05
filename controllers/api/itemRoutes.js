import express from 'express';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// import all models to easily manipulate includes
// remove unused models before deployment
import { Customer, Order, Shift, Item, ShiftItem } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// GET all items
router.get('/', apiAuth, async (req, res) => {
	try {
		const { UserId } = req;

		const options = {
			where: { UserId },
			order: [['name']]
		};

		const items = await Item.findAll(options);
		if (!items.length) return res.status(404).json({ error: 'There are no items.' });

		return res.status(200).json(items);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// GET one item
router.get('/:id', async (req, res) => {
	try {
		const options = {
			include: { all: true }
		};

		const item = await Item.findByPk(req.params.id, options);
		if (!item) return res.status(404).json({ error: 'This item could not be found.' });

		return res.status(200).json(item);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// POST new item
router.post('/', apiAuth, async (req, res) => {
	try {
		const { UserId } = req;

		const shift = await Shift.findOrCreate({
			where: {
				date: dayjs().format('YYYY-MM-DD'),
				UserId
			}
		});

		const item = await Item.findOrCreate({
			where: {
				...req.body,
				UserId
			}
		});

		const shiftItem = await ShiftItem.findOrCreate({
			where: {
				ShiftId: shift[0].id,
				ItemId: item[0].id
			}
		});

		return res.status(200).json({ message: 'Item added!', item, shiftItem });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// PUT update item
router.put('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { id: req.params.id }
		};

		const item = await Item.update(req.body, options);
		if (!item) return res.status(404).json({ error: 'This item could not be found.' });

		return res.status(200).json({ message: 'item updated!', item });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// DELETE item
router.delete('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { id: req.params.id }
		};

		const item = await Item.destroy(options);
		if (!item) return res.status(404).json({ error: 'This item could not be found.' });

		return res.status(200).json({ message: 'item deleted!', item });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

export default router;
