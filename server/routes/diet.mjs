import express from 'express';
import { createDiet, loadDiet, loadDiets } from '../controllers/dietController.mjs';
const router = express.Router();

router.get('/loadDiet', loadDiet);
router.get('/loadDiets', loadDiets);
router.post('/createDiet', createDiet);

export default router;