import express from 'express';
import cors from 'cors';
import { movies } from './routes/movieRoute.js';
import { actor } from './routes/actorRoute.js';
import { earnings } from './routes/earningsRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/movies', movies);
app.use('/actors', actor);
app.use('/earnings', earnings);


app.listen(3001);