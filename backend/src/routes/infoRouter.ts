import express from 'express'
import { listBuildings } from '../controllers/infoController';
import { authMiddleware } from '../middlewares/auth.middleware';
export const  infoRouter = express.Router()

infoRouter.get('/listBuilding',authMiddleware,listBuildings)

