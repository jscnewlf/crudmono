import express from 'express';
import { register, login, logout, getAuthenticatedUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getAuthenticatedUser);

export default router;