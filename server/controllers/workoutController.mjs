import { UserModel, ExerciseModel, WorkoutModel } from "../models/db.mjs";

const loadWorkouts = async (req, res) => {
    const {username} = req.query;

    const foundUser = await UserModel.findOne({username}).populate('workouts');
    const workouts = foundUser.workouts;

    console.log(workouts);

    return res.status(200).json({ workouts });
}

const loadWorkout = async (req, res) => {
    const {username, workout} = req.query;

    const foundUser = await UserModel.findOne({username});
    const selectedWorkout = await WorkoutModel.findOne({_id: foundUser.workouts[workout]});

    return res.status(200).json({ selectedWorkout });
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

const createWorkout = async (req, res) => {
    const { username, name, difficulty, exerciseArray } = req.body;
    console.log('created workout request received');

    try {
        // 1. Find the user
        const foundUser = await UserModel.findOne({ username });

        if (!foundUser) {
            console.log('user not found');
            return res.status(404).json({ error: "User not found" });
        }

        const exercises = Array.isArray(exerciseArray)
            ? exerciseArray.map(ex => ({
                name: ex.name,
                reps: ex.reps,
                sets: ex.sets
            }))
            : [];

        const newWorkout = await WorkoutModel.create({
            name,
            difficulty,
            exercises
        });

        foundUser.workouts.push(newWorkout._id);
        await foundUser.save();

        return res.status(201).json({ workoutId: newWorkout._id });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};


export {
    loadWorkouts,
    loadWorkout,
    updateWorkout,
    createWorkout
}