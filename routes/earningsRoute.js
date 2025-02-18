import express from 'express';
export const earnings = express()
import { getEarnings, addEarnings, updateEarnings, deleteEarnings } from '../controllers/earningsController.js';

earnings.get('/', getEarnings);
earnings.post('/', addEarnings);
earnings.put('/:id', updateEarnings);
earnings.delete('/:id', deleteEarnings);