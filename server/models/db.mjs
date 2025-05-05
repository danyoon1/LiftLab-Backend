import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
    }],
});

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    }
});

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    exercises: [
        ExerciseSchema
    ]
});

const UserModel = mongoose.model('User', UserSchema);
const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);
const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

export {
    UserModel,
    ExerciseModel,
    WorkoutModel
}