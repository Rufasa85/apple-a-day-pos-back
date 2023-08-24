import express from 'express';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// import all models to easily manipulate includes
// remove unused models before deployment
import { Customer, Order, Shift, Item, ShiftItem, OrderItem } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// GET all shifts
router.get('/', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { UserId: req.UserId },
			include: [
				{ model: Order, include: [{ model: OrderItem }] },
				{ model: ShiftItem, include: [{ model: Item }] }
			],
		};

		const shifts = await Shift.findAll(options);
		if (!shifts.length) return res.status(404).json({ error: 'There are no shifts.' });
    const sorted = shifts.sort((a,b) => new Date(b.date)- new Date(a.date))
		return res.status(200).json(sorted);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

// GET today's shift
router.get('/today/:UserId', async (req, res) => {
	try {
		const { UserId } = req.params;
		if (!UserId) return res.status(400).json({ error: `Please include { UserId: number } in the request body` });

		const options = {
			where: { date: dayjs().format('YYYY-MM-DD'), UserId },
			include: [{ model: ShiftItem, include: [{ model: Item }] }]
		};

		const shift = await Shift.findOne(options);
		if (!shift) return res.status(404).json({ error: 'This shift could not be found.' });

		return res.status(200).json(shift);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

// GET one shift
router.get('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			// include: { all: true, nested: true }
			include: [{ model: Order, include: [{ model: OrderItem, include: { model: Item } }, {model: Customer}] }]
		};

		const shift = await Shift.findByPk(req.params.id, options);
		if (!shift) return res.status(404).json({ error: 'This shift could not be found.' });

		return res.status(200).json(shift);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

// POST new shift
router.post('/', apiAuth, async (req, res) => {
	try {
		const shift = await Shift.create({ ...req.body, UserId: req.userId });
		if (!shift) return res.status(400).json({ error: 'This shift could not be created.' });

		return res.status(200).json({ message: 'shift created!', shift });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

// PUT update shift
router.put('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { id: req.params.id }
		};

		const shift = await Shift.update(req.body, options);
		if (!shift) return res.status(404).json({ error: 'This shift could not be found.' });

		return res.status(200).json({ message: 'shift updated!', shift });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// DELETE shift
router.delete('/:id', apiAuth, async (req, res) => {
	try {
		const options = {
			where: { id: req.params.id }
		};

		const shift = await Shift.destroy(options);
		if (!shift) return res.status(404).json({ error: 'This shift could not be found.' });

		return res.status(200).json({ message: 'shift deleted!', shift });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
