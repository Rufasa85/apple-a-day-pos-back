import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

import { User } from '../../models/index.js';
import apiAuth from '../../middleware/apiAuth.js';
import resetGuestData from '../../seed/resetGuestData.js';

const router = express.Router();

// POST user login
router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) return res.status(400).json({ error: `Please include { username: string, password: string } in the request body` });

		const options = {
			where: { username }
		};

		const foundUser = await User.findOne(options);
		if (!foundUser) return res.status(400).json({ error: 'Incorrect username or password.' });

		const passwordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Incorrect username or password.' });

		const UserId = foundUser.id;
		const token = jwt.sign({ UserId }, process.env.JWT_SECRET, { expiresIn: '12h' });

		const isGuest = foundUser.username === 'guest';
		if (isGuest) resetGuestData(UserId);

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
