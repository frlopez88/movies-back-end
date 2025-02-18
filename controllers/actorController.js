import { db } from "../db/cn.js";

export const getActors = async (req, res) => {
    try {
        const actors = await db.query('SELECT * FROM actors');
        res.json(actors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch actors' });
    }
};
export const addActor = async (req, res) => {
    const { name, dateOfBirth, nationality } = req.body;
    try {
        const newActor = await db.query('INSERT INTO actors (name, dateOfBirth, nationality) VALUES ($1, $2, $3) RETURNING *',
            [name, dateOfBirth, nationality]);
        res.status(201).json(newActor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add actor' });
    }
};
export const updateActor = async (req, res) => {
    const { id } = req.params;
    const { name, dateOfBirth, nationality } = req.body;
    try {
        const updatedActor = await db.query('UPDATE actors SET name=$1, dateOfBirth=$2, nationality=$3 WHERE id=$4 RETURNING *',
            [name, dateOfBirth, nationality, id]);
        res.json(updatedActor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update actor' });
    }
};
export const deleteActor = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM actors WHERE id=$1', [id]);
        res.json({ message: 'Actor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete actor' });
    }
};