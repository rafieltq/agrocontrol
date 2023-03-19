import express from 'express';
import MeasureController from '../controllers/MeasureController';

const router = express.Router();

router.post('/', MeasureController.create);
router.get('/', MeasureController.getAll);
router.get('/:id', MeasureController.getById);
router.put('/:id', MeasureController.update);
router.delete('/:id', MeasureController.delete);

export default router;
