import pg from 'pg-promise';
import dotenv from 'dotenv'
dotenv.config();
const pgp = pg();
export const db = pgp(process.env.DATABASE_URL);
