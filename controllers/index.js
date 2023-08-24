import express from 'express';
import api from './api/index.js';

const router = express.Router();
router.use('/api', api);

router.use((req, res) => {
	res.status(418).redirect('https://http.cat/418');
});

export default router;
