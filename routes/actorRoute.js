import express from 'express';
export const actor = express()
import { getActors, addActor, updateActor, deleteActor } from '../controllers/actorController.js';

actor.get('/', getActors);
actor.post('/', addActor);
actor.put('/:id', updateActor);
actor.delete('/:id', deleteActor);