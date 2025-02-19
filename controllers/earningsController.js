import { db } from '../db/cn.js';
export const getEarnings = async (req, res) => {
    try {
        const sql = 'SELECT * FROM earnings'
        const result  = await db.query(sql);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch earnings' });
    }
};
export const addEarnings = async (req, res) => {
    const tmp = req.body;
    try {
        const sql = 'INSERT INTO earnings (movieId, country, revenue) VALUES ($1, $2, $3) '
        const arr  = [tmp.movieId, tmp.country, tmp.revenue]
        const result = await db.query(sql,arr);
        res.status(200).json({message: "Created Earning"});
    } catch (error) {
        res.status(500).json({ error: 'Failed to add earnings' });
    }
};
export const updateEarnings = async (req, res) => {
    const id  = req.params.id;
    const tmp = req.body;
    try {
        const sql ='UPDATE earnings SET movieId=$1, country=$2, revenue=$3 WHERE EarningsID=$4 '
        const arr = [tmp.movieId, tmp.country, tmp.revenue, id]
        const result = await db.query(sql,arr);
        res.json({message: "Updated Earning"});
    } catch (error) {
        res.status(500).json({ error: 'Failed to update earnings' });
    }
};
export const deleteEarnings = async (req, res) => {
    const id = req.params.id;
    const temp =  req.body;
    try {
        const sql = 'DELETE FROM earnings WHERE EarningsID=$1'
        const arr = [id]
        const result = await db.query(sql, arr);
        res.json({ message: 'Earnings entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete earnings' });
    }
};