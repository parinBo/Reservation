import express, { Request, Response } from 'express'
import { User } from '../models/userModel';
import {signUp, signin} from '../controllers/userController'
import { authMiddleware } from '../middlewares/auth.middleware';
export const  userRouter = express.Router()

userRouter.post('/createUser', signUp)
userRouter.post('/signin',signin)
