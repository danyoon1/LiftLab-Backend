import express from 'express';
import { loadExercises, updateWorkout } from '../controllers/workoutController.mjs';
const router = express.Router();

router.get('/load', loadExercises);
router.post('/update', updateWorkout);

export default router;