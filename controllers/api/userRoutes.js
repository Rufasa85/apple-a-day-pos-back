import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

import { User } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// POST user login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ error: `Please include { email: string, password: string } in the request body` });

		const options = {
			where: {
				email: req.body.email
			}
		};

		const foundUser = await User.findOne(options);
		if (!foundUser) return res.status(400).json({ error: 'Incorrect email or password.' });

		const passwordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Incorrect email or password.' });

		const UserId = foundUser.id;
		const token = jwt.sign({ UserId }, process.env.JWT_SECRET, { expiresIn: '12h' });

		return res.status(200).json({ token, UserId });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

router.post('/check-token', apiAuth, (req, res) => {
	try {
		const { UserId } = req;

		const token = jwt.sign({ UserId }, process.env.JWT_SECRET, { expiresIn: '12h' });

		return res.status(200).json({ token, UserId });
	} catch (error) {
		console.log(error);
		return res.status(403).json({ msg: 'bad token' });
	}
});

export default router;
