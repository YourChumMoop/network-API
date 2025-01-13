import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes)
export default router;


