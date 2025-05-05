import './config/config.mjs';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './config/dbCon.mjs';
import cors from 'cors';
import corsOptions from './config/corsOptions.mjs';
import credentials from './middleware/credentials.mjs';

import registerRoute from './routes/register.mjs';
import authRoute from './routes/auth.mjs';
import workoutRoute from './routes/workout.mjs';
import dietRoute from './routes/diet.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3500;

// connect to mongodb
connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(credentials);
// app.use(cors(corsOptions));

// routes
app.use('/register', registerRoute);
app.use('/auth', authRoute);
app.use('/diet', dietRoute);
app.use('/workout', workoutRoute);