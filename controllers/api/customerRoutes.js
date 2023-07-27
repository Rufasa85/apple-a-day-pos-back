import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// import all models to easily manipulate includes
// remove unused models before deployment
import { Customer, Order, Shift, Item, OrderItem } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// GET all customers
router.get('/', apiAuth, async (req, res) => {
	try {
		const options = {
			// include: { all: true, nested: true },
			// include: { all: true },
      where:{ UserId: req.userId},
			order: [['lastName'], ['firstName']],
      include: [{model: Order}]
		};

		const customers = await Customer.findAll(options);
		if (!customers.length) return res.status(404).json({ error: 'There are no customers.' });

		return res.status(200).json(customers);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// GET one customer
router.get('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			// include: { all: true, nested: true }
			// include: { all: true }
			include: [{ model: Order, include: [{model: Shift}, {model: OrderItem, include: {model: Item}}] }]
		};

		const customer = await Customer.findByPk(req.params.id, options);
		if (!customer) return res.status(404).json({ error: 'This customer could not be found.' });

		return res.status(200).json(customer);
	} catch (error) {
    console.log(error)
		return res.status(500).json({ error });
	}
});

// POST new customer
router.post('/', apiAuth, async (req, res) => {
	try {
		const customer = await Customer.create({...req.body, UserId: req.userId});
		if (!customer) return res.status(400).json({ error: 'This customer could not be created.' });

		return res.status(200).json({ message: 'Customer created!', customer });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT update customer
router.put('/:id', apiAuth, async (req, res) => {
	try {
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
router.delete('/:id', apiAuth, async (req, res) => {
	try {
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
