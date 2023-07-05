import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// import all models to easily manipulate includes
// remove unused models before deployment
import { Customer, Order, Shift, Item } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
	try {
		const options = {
			// include: { all: true, nested: true },
			// include: { all: true },
			order: [['name']]
		};

		const items = await Item.findAll(options);
		if (!items.length) return res.status(404).json({ error: 'There are no items.' });

		return res.status(200).json(items);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// GET one item
router.get('/:id', async (req, res) => {
	try {
		const options = {
			// include: { all: true, nested: true }
			include: { all: true }
		};

		const item = await Item.findByPk(req.params.id, options);
		if (!item) return res.status(404).json({ error: 'This item could not be found.' });

		return res.status(200).json(item);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// POST new item
//TODO: replace all auth with this piece of middleware
router.post('/',apiAuth,  async (req, res) => {
	try {
		const item = await Item.create(req.body);
		if (!item) return res.status(400).json({ error: 'This item could not be created.' });

		return res.status(200).json(item);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT update item
router.put('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			where: { id: req.params.id }
		};

		const item = await Item.update(req.body, options);
		if (!item) return res.status(404).json({ error: 'This item could not be found.' });

		return res.status(200).json({ message: 'item updated!', item });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// DELETE item
router.delete('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			where: { id: req.params.id }
		};

		const item = await Item.destroy(options);
		if (!item) return res.status(404).json({ error: 'This item could not be found.' });

		return res.status(200).json({ message: 'item deleted!', item });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
