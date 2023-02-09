import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || "8080";
const DB_URL: string | undefined = process.env.DB_URL

export {
    PORT,
    DB_URL,
}