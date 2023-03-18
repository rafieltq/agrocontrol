import express from 'express';
import userRoutes from './User';
import Auth from './Auth';
// Initialization
let router = express.Router();

// Routes
router.use('/users', userRoutes);
router.use('/auth', Auth);

export default router;