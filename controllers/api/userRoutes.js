import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import apiAuth from '../../middleware/apiAuth.js';

const router = express.Router();

// POST user login
router.post('/login', (req, res) => {
	try {
		const passwordMatch = req.body.password === process.env.APP_PASSWORD;
		if (!passwordMatch) return res.status(400).json({ error: 'Login failed.' });

		const token = jwt.sign({ loggedIn: true }, process.env.JWT_SECRET, { expiresIn: '12h' });
		return res.status(200).json({ token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

router.post('/checktoken', apiAuth, (req, res) => {
	try {
		return res.status(200).json(req.loggedIn);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
});

export default router;
