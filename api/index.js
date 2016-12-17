import express from 'express';

const router = express.Router();

router.get('/phrase', (req, res) => {
	res.json({
		data: 'This is a test phrase for server testing.'
	})
})

export default router;