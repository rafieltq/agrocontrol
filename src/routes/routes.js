import express from 'express';
import userRoutes from './User';
import Auth from './Auth';
import Manager from './Manager';
import Measure from './Measure';
import Terreno from './Terreno';

// Initialization
let router = express.Router();

// Routes
router.use('/users', userRoutes);
router.use('/auth',Auth);
router.use('/manager', Manager);
router.use('/terreno', Terreno);
router.use('/measure', Measure);
export default router;


