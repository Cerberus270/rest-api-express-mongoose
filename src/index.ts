import express, { Express, NextFunction, Request, Response } from 'express';
import { PORT, DB_URL } from './config/config';
import mongoose, { Connection, ConnectOptions, mongo } from 'mongoose';
import router from './routes/productRoutes';
import bodyParser from 'body-parser';
import multer from 'multer';


const app: Express = express();

mongoose.set('strictQuery', true);
mongoose.connect(`${DB_URL}`, <ConnectOptions>{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})

const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log(`DB Connected to ${db.name}`);
})

app.use(bodyParser.json());

app.use("/api", router);

//Undefined Route Implement
app.use('*', (req: Request, res: Response)=>{
  res.status(404).json({code:404, status:"fail", data:"Not Found"})
});

app.listen(PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
});
