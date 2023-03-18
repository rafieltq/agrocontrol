import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import {verifyToken} from '../middlewares/Auth';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', verifyToken, AuthController.me);

export default router;