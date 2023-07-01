import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { Order } from '../../models/index.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			// include: { all: true, nested: true }
		};

		const orders = await Order.findAll(options);
		if (!orders.length) return res.status(404).json({ error: 'There are no orders.' });

		return res.status(200).json(orders);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// GET one order
router.get('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			include: { all: true, nested: true }
		};

		const order = await Order.findByPk(req.params.id, options);
		if (!order) return res.status(404).json({ error: 'This order could not be found.' });

		return res.status(200).json(order);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// POST new order
router.post('/', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const order = await Order.create(req.body);
		if (!order) return res.status(400).json({ error: 'This order could not be created.' });

		return res.status(200).json(order);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT update order
router.put('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			where: { id: req.params.id }
		};

		const order = await Order.update(req.body, options);
		if (!order) return res.status(404).json({ error: 'This order could not be found.' });

		return res.status(200).json({ message: 'order updated!', order });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// DELETE order
router.delete('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			where: { id: req.params.id }
		};

		const order = await Order.destroy(options);
		if (!order) return res.status(404).json({ error: 'This order could not be found.' });

		return res.status(200).json({ message: 'order deleted!', order });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
