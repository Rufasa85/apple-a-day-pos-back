import jwt from 'jsonwebtoken';

export default function apiAuth(req, res, next) {
	try {

		const token = jwt.verify(req.headers?.authorization?.split(' ')[1], process.env.JWT_SECRET);
    req.userId = token.userId
		next(); // pass in argument to next()?? 
	} catch {
		res.status(403).json({ msg: 'invalid token' });
	}
}
