import { UserModel, ExerciseModel, WorkoutModel } from "../models/db.mjs";

const loadExercises = async (req, res) => {
    const {username, workout} = req.query;

    const foundUser = await UserModel.findOne({username});
    const selectedWorkout = await WorkoutModel.findOne({_id: foundUser.workouts[workout]});

    const exerciseArray = selectedWorkout.exercises.map(exercise => {
        const exerciseInfo = {
            name: exercise.name,
            reps: exercise.reps,
            sets: exercise.sets
        }

        return exerciseInfo;
    });

    return res.status(200).json({ exerciseArray });
}

const updateWorkout = async (req, res) => {
    const { username, workout, exerciseArray } = req.body;

    const foundUser = await UserModel.findOne({ username });
    const selectedWorkout = await WorkoutModel.findOne({ _id: foundUser.workouts[workout] });

    console.log(exerciseArray)
    const asyncResult = await Promise.all(exerciseArray.map(async (exercise) => {
        if (exercise) {
            const newExercise = await ExerciseModel.create({
                exercise
            });

            selectedWorkout.exercises.push(newExercise);

            return newExercise;
        }
    }));

    const result = await selectedWorkout.save();

    return res.sendStatus(200);
}

export {
    loadExercises,
    updateWorkout
}