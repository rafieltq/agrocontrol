import { Router } from 'express';
import TerrenoController from '../controllers/TerrenoController';

const router = Router();

router.post('/', TerrenoController.create);
router.get('/', TerrenoController.getAll);
router.get('/:id', TerrenoController.getById);
router.put('/:id', TerrenoController.update);
router.delete('/:id', TerrenoController.delete);

export default router;
