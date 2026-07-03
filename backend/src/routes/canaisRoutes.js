import { Router } from 'express';
import { getCanais } from '../controller/canaisController.js';
import { autenticar } from "../middleware/authMiddleware.js";
const router = Router();

router.get('/', autenticar, getCanais);

export default router;