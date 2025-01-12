import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes';

router.use('/users', userRoutes);

export default router;


