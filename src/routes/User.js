import {Router} from 'express';
import UserController from '../controllers/UserController';
import {verifyToken} from '../middlewares/Auth';
const router = Router();

router.get('/', verifyToken,UserController.getAll );
router.get('/:id', verifyToken,UserController.getById );
router.put('/:id', verifyToken,UserController.update );
router.post('/', verifyToken,UserController.create );
router.delete('/:id', verifyToken,UserController.delete);

export default router;