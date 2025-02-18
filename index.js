import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { movies } from './routes/movieRoute.js';
import { actor } from './routes/actorRoute.js';
import { earnings } from './routes/earningsRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/movies', movies);
app.use('/actors', actor);
app.use('/earnings', earnings);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));