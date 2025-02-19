import { db } from "../db/cn.js";

export const getActors = async (req, res) => {
    try {
        const sql = "SELECT * FROM actors"
        const actors = await db.query(sql);
        res.json(actors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch actors' });
    }
};
export const addActor = async (req, res) => {
    const tmp = req.body;
    try {
        const sql = 'INSERT INTO actors (name, dateOfBirth, nationality) VALUES ($1, $2, $3)'
        const arr =  [tmp.name, tmp.dateOfBirth, tmp.nationality]
        const result = await db.query(sql,arr);
        res.status(200).json({message:"Actor Created"});
    } catch (error) {
        res.status(500).json({ error: 'Failed to add actor' });
    }
};
export const updateActor = async (req, res) => {
    const  id  = req.params.id;
    const tmp = req.body;
    try {
        const sql = 'UPDATE actors SET name=$1, dateOfBirth=$2, nationality=$3 WHERE ActorID=$4'
        const arr = [tmp.name, tmp.dateOfBirth, tmp.nationality, id]
        const result = await db.query(sql,arr);
        res.json({message: "Updated Actor"});
    } catch (error) {
        res.status(500).json({ error: 'Failed to update actor' });
    }
};
export const deleteActor = async (req, res) => {
    const  id  = req.params.id;
    try {
        const sql = 'DELETE FROM actors WHERE ActorID=$1'
        const arr= [id]
        const result = await db.query(sql, arr);
        res.json({ message: 'Actor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete actor' });
    }
};