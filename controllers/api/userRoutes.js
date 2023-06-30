import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// POST user login
router.post('/login', (req, res) => {
	try {
		const passwordMatch = bcrypt.compare(req.body.password, process.env.APP_PASSWORD);
		if (!passwordMatch) return res.status(400).json({ error: 'Login failed.' });

		const token = jwt.sign({ loggedIn: true }, process.env.JWT_SECRET, { expiresIn: '12h' });
		return res.status(200).json({ token });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
