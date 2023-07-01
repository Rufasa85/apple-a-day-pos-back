import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { Customer, Order, Shift, Item } from '../../models/index.js';

const router = express.Router();

// GET all customers
router.get('/', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			// include: { all: true, nested: true },
			// include: { all: true },
			order: [['lastName'], ['firstName']]
		};

		const customers = await Customer.findAll(options);
		if (!customers.length) return res.status(404).json({ error: 'There are no customers.' });

		return res.status(200).json(customers);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// GET one customer
router.get('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			// include: { all: true, nested: true }
			// include: { all: true }
			include: [{ model: Order, include: { all: true } }]
		};

		const customer = await Customer.findByPk(req.params.id, options);
		if (!customer) return res.status(404).json({ error: 'This customer could not be found.' });

		return res.status(200).json(customer);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// POST new customer
router.post('/', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const customer = await Customer.create(req.body);
		if (!customer) return res.status(400).json({ error: 'This customer could not be created.' });

		return res.status(200).json(customer);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT update customer
router.put('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			where: { id: req.params.id }
		};

		const customer = await Customer.update(req.body, options);
		if (!customer) return res.status(404).json({ error: 'This customer could not be found.' });

		return res.status(200).json({ message: 'Customer updated!', customer });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// DELETE customer
router.delete('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			where: { id: req.params.id }
		};

		const customer = await Customer.destroy(options);
		if (!customer) return res.status(404).json({ error: 'This customer could not be found.' });

		return res.status(200).json({ message: 'customer deleted!', customer });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
