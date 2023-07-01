import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { Shift } from '../../models/index.js';

const router = express.Router();

// GET all shifts
router.get('/', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			// include: { all: true, nested: true }
		};

		const shifts = await Shift.findAll(options);
		if (!shifts.length) return res.status(404).json({ error: 'There are no shifts.' });

		return res.status(200).json(shifts);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// GET one shift
router.get('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const options = {
			include: { all: true, nested: true }
		};

		const shift = await Shift.findByPk(req.params.id, options);
		if (!shift) return res.status(404).json({ error: 'This shift could not be found.' });

		return res.status(200).json(shift);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// POST new shift
router.post('/', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

		const shift = await Shift.create(req.body);
		if (!shift) return res.status(400).json({ error: 'This shift could not be created.' });

		return res.status(200).json(shift);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT update shift
router.put('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

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
router.delete('/:id', async (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization, process.env.JWT_SECRET);

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
