import express, { Request, Response } from 'express'
export const  seatRouter = express.Router()

seatRouter.get('/getSeat', (req:Request, res:Response)=>{
  const id = req.query
  console.log(id)
  res.json('good')
})

