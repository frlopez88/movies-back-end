import express from 'express';
import cors from 'cors';
import { movies } from './routes/movieRoute.js';
import { actor } from './routes/actorRoute.js';
import { earnings } from './routes/earningsRoute.js';
import { authUser } from './routes/authRoute.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authUser);

const tokenValidation = (req, res, next) => {

    const authorization = req.headers['authorization']
    if (!authorization) {
        return res.status(400).json({ message: "You need to pass a Token" })
    }

    const token = authorization.replace('Bearer ', '')

    try {
        const secret = process.env.KEY_SECRET
        const decodeToken = jwt.verify(token, secret)
        next()
    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" })
    }



}


// Routes
app.use('/api/movies', tokenValidation, movies);
app.use('/api/actors', tokenValidation, actor);
app.use('/api/earnings', tokenValidation, earnings);


app.post('/api/validateSesion', tokenValidation, (req, res) => {
    res.json({ message: "Valid Token" })
})

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // React
});


const port = process.env.PORT || 8080

app.listen(port);