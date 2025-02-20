import express from 'express';
import cors from 'cors';
import { movies } from './routes/movieRoute.js';
import { actor } from './routes/actorRoute.js';
import { earnings } from './routes/earningsRoute.js';
import { authUser } from './routes/authRoute.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const tokenValidation =(req, res, next)=>{

    const authorization = req.headers['authorization']
    if (!authorization){
        return res.status(400).json({message : "You need to pass a Token"})
    }

    const token = authorization.replace('Bearer ', '')

    try {
        const secret = process.env.KEY_SECRET
        const decodeToken = jwt.verify(token, secret)
        next()
    }catch(err){
        return res.status(400).json({message : "Invalid Token"})
    }
    

    
}


// Routes
app.use('/movies', tokenValidation , movies);
app.use('/actors', tokenValidation, actor);
app.use('/earnings', tokenValidation, earnings);
app.use('/auth', authUser);

app.listen(3001);