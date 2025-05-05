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
    diets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet'
    }]
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

const DietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bodyWeight: {
        type: Number,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    desiredWeight: {
        type: Number,
        required: true
    },
    timeConstraint: {
        type: String,
        required: true
    },
    calPerDay: {
        type: Number,
        required: true
    },
    proteinPerDay: {
        type: Number,
        required: true
    },
    carbPerDay: {
        type: Number,
        required: true
    },
    fatPerDay: {
        type: Number,
        required: true
    },
    otherNotes: [{
        type: String,
        required: true
    }],
});

const UserModel = mongoose.model('User', UserSchema);
const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);
const WorkoutModel = mongoose.model('Workout', WorkoutSchema);
const DietModel = mongoose.model('Diet', DietSchema);

export {
    UserModel,
    ExerciseModel,
    WorkoutModel,
    DietModel
}