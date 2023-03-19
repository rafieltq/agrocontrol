import express from 'express';
import ManagerController from '../controllers/ManagerController';

const router = express.Router();

router.post('/', ManagerController.create);
router.get('/', ManagerController.getAll);
router.get('/:id', ManagerController.getById);
router.put('/:id', ManagerController.update);
router.delete('/:id', ManagerController.delete);

export default router;
