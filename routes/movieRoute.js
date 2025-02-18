import express from 'express';
export const movies = express();
import { getMovies, addMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';

movies.get('/', getMovies);
movies.post('/', addMovie);
movies.put('/:id', updateMovie);
movies.delete('/:id', deleteMovie);
