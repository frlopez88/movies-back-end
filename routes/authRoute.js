import express from 'express';
export const authUser = express();
import { signIn, logIn } from '../controllers/authController.js';

authUser.post('/register', signIn);
authUser.post('/logIn', logIn);

