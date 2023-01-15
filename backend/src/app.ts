import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRouter';
import { seatRouter } from './routes/seatRouter';
import cors from 'cors';
import { infoRouter } from './routes/infoRouter';
import { orderRouter } from './routes/orderRouter';
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRouter)
app.use('/seat',seatRouter)
app.use('/order',orderRouter)
app.use('/info',infoRouter)
app.get('/', (req:Request, res:Response)=>{
  res.send('<h1>Hi</h1>')
})

app.listen(3000,'0.0.0.0',()=>{
  console.log('app start on PORT',3000)
})


