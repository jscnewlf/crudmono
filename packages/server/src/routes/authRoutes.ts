import express from 'express';
import cookieParser from 'cookie-parser';
import { register, login, logout, getAuthenticatedUser } from '../controllers/authController';

const router = express.Router();

router.use(cookieParser());

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getAuthenticatedUser);

export default router;
