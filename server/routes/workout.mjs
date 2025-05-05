import express from 'express';
import { createWorkout, loadWorkout, loadWorkouts, updateWorkout } from '../controllers/workoutController.mjs';
const router = express.Router();

router.get('/loadWorkouts', loadWorkouts);
router.get('/loadWorkout', loadWorkout);
router.post('/updateWorkout', updateWorkout);
router.post('/createWorkout', createWorkout);

export default router;