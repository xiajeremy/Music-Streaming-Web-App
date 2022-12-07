import express from 'express';
import { signin, signup } from '../controllers/users.js';

const router = express.Router()



//SIgn In
router.post('/signin', signin);
//Sign up
router.post('/signup', signup);


export default router;
