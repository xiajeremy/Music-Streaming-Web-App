import express from 'express';
import auth from '../middleware/auth.js';


const router = express.Router()

router.get(async (req, res) => {
		const policy = await PrivacyPolicy.find();
		res.send(policy);
	})
	.post(async (req, res) => {
		const policy = req.body.text;
		await PrivacyPolicy.updateOne(
			{ id: req.body.id },
			{
				policyText: policy,
			},
			function (err, doc) {
				if (err) return console.error(err);
				console.log("Document updated!");
			}
	).clone();
});

export default router;