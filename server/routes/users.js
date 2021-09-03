import express from 'express'

import { signin, signup, getUser, getUsers, updateUser } from '../controllers/user.js'

const router = express.Router();

router.get('/all', getUsers);
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id', getUser)
router.patch('/:id', updateUser);

export default router;