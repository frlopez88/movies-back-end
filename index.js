import express from 'express';
import cors from 'cors';
import { movies } from './routes/movieRoute.js';
import { actor } from './routes/actorRoute.js';
import { earnings } from './routes/earningsRoute.js';
import { authUser } from './routes/authRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

const myMiddleWare = (req, res, next)=>{
    console.log("Enter to the middleware")
    const data =  req.body
    console.log(req.body)
    next()
}


// Routes
app.use('/movies', myMiddleWare, movies);
app.use('/actors', actor);
app.use('/earnings', earnings);
app.use('/auth', authUser)

app.listen(3001);