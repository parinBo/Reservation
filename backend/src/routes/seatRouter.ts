import express, { Request, Response } from 'express'
import { bookSeat, getSeat } from '../controllers/seatController';
import { authMiddleware } from '../middlewares/auth.middleware';
export const  seatRouter = express.Router()

seatRouter.get('/getSeat',authMiddleware, getSeat);

seatRouter.post('/reservation',authMiddleware, bookSeat);
