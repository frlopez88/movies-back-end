import { db } from '../db/cn.js';
export const getEarnings = async (req, res) => {
    try {
        const earnings = await db.query('SELECT * FROM earnings');
        res.json(earnings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch earnings' });
    }
};
export const addEarnings = async (req, res) => {
    const { movieId, country, revenue } = req.body;
    try {
        const newEarnings = await db.query('INSERT INTO earnings (movieId, country, revenue) VALUES ($1, $2, $3) RETURNING *',
            [movieId, country, revenue]);
        res.status(201).json(newEarnings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add earnings' });
    }
};
export const updateEarnings = async (req, res) => {
    const { id } = req.params;
    const { movieId, country, revenue } = req.body;
    try {
        const updatedEarnings = await db.query('UPDATE earnings SET movieId=$1, country=$2, revenue=$3 WHERE id=$4 RETURNING *',
            [movieId, country, revenue, id]);
        res.json(updatedEarnings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update earnings' });
    }
};
export const deleteEarnings = async (req, res) => {
    const { id } = req.params;
    try {
        await db.quqey('DELETE FROM earnings WHERE id=$1', [id]);
        res.json({ message: 'Earnings entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete earnings' });
    }
};