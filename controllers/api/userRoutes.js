import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import apiAuth from '../../middleware/apiAuth.js';
import { User } from '../../models/index.js';
dotenv.config();

import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// POST user login
router.post('/login', async (req, res) => {
	try {
		const foundUser = await User.findOne({
			where: {
				email: req.body.email
			}
		});
		if (!foundUser) return res.status(400).json({ error: 'No user with that email' });
		const check = bcrypt.compareSync(req.body.password, foundUser.password);
		if (!check) return res.status(400).json({ error: 'wrong password' });

		const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
		return res.status(200).json({ token, userId: foundUser.id });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

router.post('/check-token', (req, res) => {
	try {
		const token = jwt.verify(req.headers?.authorization?.split(' ')[1], process.env.JWT_SECRET);
		console.log(token);
		const newToken = jwt.sign({ userId: token.userId }, process.env.JWT_SECRET, { expiresIn: '12h' });
		return res.status(200).json({ token: newToken, userId: token.userId });
	} catch (error) {
		// console.log(error);
		return res.status(403).json({ msg: 'bad token' });
	}
});

export default router;
