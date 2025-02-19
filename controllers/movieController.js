import { db } from "../db/cn.js";
export const getMovies = async (req, res) => {
    try {
        const sql = `SELECT * FROM movies`;
        const movies = await db.query(sql);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};
export const addMovie = async (req, res) => {
    const tmp = req.body;
    try {
        const sql = 'INSERT INTO movies (title, releaseYear, genre, duration) VALUES ($1, $2, $3, $4)'
        const arr = [tmp.title, tmp.releaseYear, tmp.genre, tmp.duration]
        const result = await db.query(sql,arr);
        res.status(200).json({message: "Movie Created"});
    } catch (error) {
        res.status(500).json({ error: 'Failed to add movie' });
    }
};
export const updateMovie = async (req, res) => {
    const id  = req.params.id;
    const tmp = req.body;
    
    try {
        const sql = 'UPDATE movies SET title=$1, releaseYear=$2, genre=$3, duration=$4 WHERE MovieID=$5'
        const arr = [tmp.title, tmp.releaseYear, tmp.genre, tmp.duration, id]
        const result = await db.query(sql,arr);
        res.status(200).json({message: "Movie updated"});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Failed to update movie' });
    }
};
export const deleteMovie = async (req, res) => {
    const  id  = req.params.id;
    try {
        const sql = 'DELETE FROM movies WHERE MovieID=$1'
        const arr = [id]
        const result = await db.query(sql, arr);
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};
