import express, { Request, Response } from 'express'
import { deleteOrder, getMyOrders } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/auth.middleware';
export const  orderRouter = express.Router()

orderRouter.get('/getMyOrders',authMiddleware,getMyOrders)
orderRouter.delete('/delMyOrder',authMiddleware,deleteOrder)
