import { db } from "../db/cn.js";
export const getMovies = async (req, res) => {
    try {
        const movies = await db.query('SELECT * FROM movies');
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};
export const addMovie = async (req, res) => {
    const { title, releaseYear, genre, duration } = req.body;
    try {
        const newMovie = await db.query('INSERT INTO movies (title, releaseYear, genre, duration) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, releaseYear, genre, duration]);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add movie' });
    }
};
export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, releaseYear, genre, duration } = req.body;
    try {
        const updatedMovie = await db.query('UPDATE movies SET title=$1, releaseYear=$2, genre=$3, duration=$4 WHERE id=$5 RETURNING *',
            [title, releaseYear, genre, duration, id]);
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update movie' });
    }
};
export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM movies WHERE id=$1', [id]);
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};
