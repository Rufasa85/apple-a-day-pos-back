import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// import all models to easily manipulate includes
// remove unused models before deployment
import { Customer, Order, Shift, Item, OrderItem } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// GET all orders
router.get('/', apiAuth, async (req, res) => {
	try {
		const options = {
			// include: { all: true, nested: true }
			include: { all: true }
		};

		const orders = await Order.findAll(options);
		if (!orders.length) return res.status(404).json({ error: 'There are no orders.' });

		return res.status(200).json(orders);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// GET one order
router.get('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			// include: { all: true, nested: true }
			include: [
				{
					model: OrderItem,
					include: { model: Item }
				}
			]
		};

		const order = await Order.findByPk(req.params.id, options);
		if (!order) return res.status(404).json({ error: 'This order could not be found.' });

		return res.status(200).json(order);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// POST new order
router.post('/', apiAuth, async (req, res) => {
	// req.body format:
	// {
	//   "CustomerId": 12,
	//   "ShiftId": 10,
	//   "items": [{ ItemId, quantity }]
	// }

	try {
		const { CustomerId, ShiftId, items } = req.body;

		const order = await Order.create({ CustomerId, ShiftId });
		if (!order) return res.status(400).json({ error: 'This order could not be created.' });

		const itemObjects = items.map((item) => ({
			OrderId: order.id,
			...item
		}));

		const orderItems = await OrderItem.bulkCreate(itemObjects);
		if (!orderItems) return res.status(400).json({ error: 'The items could not be added to the order.' });

		return res.status(200).json({ message: 'order created!', order });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// PUT update order
router.put('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { id: req.params.id }
		};

		const order = await Order.update(req.body, options);
		if (!order) return res.status(404).json({ error: 'This order could not be found.' });

		return res.status(200).json({ message: 'order updated!', order });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

// DELETE order
router.delete('/:id', apiAuth, async (req, res) => {
	try {
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
