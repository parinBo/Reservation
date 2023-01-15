import { Request, Response } from "express";
import { connection } from "../config/db";
import { getUser } from "./userController";
import * as jwt from 'jsonwebtoken';
import { responseData, STATUS_CODE } from "../models/responseModel";
const getMyOrders = async (req:Request, res:Response)=>{
  try{
    const user:any = jwt.decode(req.headers['authorization'] || '');
    const userId = (await getUser(user.username)).id;
    const resultSelect = await selectOwnOrder(userId);
    res.status(parseInt(STATUS_CODE.OK)).json(responseData('s',STATUS_CODE.OK,resultSelect))
  }catch(e:any){
    console.log(e)
    res.status(parseInt(STATUS_CODE.INTERNAL_SERVER_ERROR)).json(responseData('s',STATUS_CODE.INTERNAL_SERVER_ERROR,e.code))
  }
}

const selectOwnOrder = async (userId:string)=>{
  const selectMyOrder = `SELECT o.seat_id as seatId,p.name ,p.level,place_id as placeId,
  start_time   as startTime,
  end_time as endTime FROM orders o
  INNER JOIN users u ON u.id = o.user_id AND u.id = ?
  INNER JOIN seats s ON s.id = o.seat_id
  INNER JOIN places p ON p.id = s.place_id ORDER BY o.start_time,o.seat_id`
  const [resultSelect]: any = (await (await connection).query(selectMyOrder,[userId]));
  (resultSelect as any[]).forEach(e=>{
    if(!!e.level){
      e.name = `${e.name}  ชั้นที่ ${e.level}`
    }
  })
  return resultSelect;
}

const deleteOrder = async (req:Request, res:Response) =>{
  const data:any = req.body;
  try{
    const user:any = jwt.decode(req.headers['authorization'] || '');
    const userId = (await getUser(user.username)).id;
    const delOrder = `DELETE FROM orders WHERE seat_id = ? and start_time = ?`;
    const [result] = (await (await connection).query(delOrder,[data.seatId,data.startTime]))
    const ownOrder = await selectOwnOrder(userId);
    res.status(parseInt(STATUS_CODE.OK)).json(responseData('s',STATUS_CODE.OK,ownOrder))
  } catch(e:any) {
    res.status(parseInt(STATUS_CODE.INTERNAL_SERVER_ERROR)).json(responseData('s',STATUS_CODE.INTERNAL_SERVER_ERROR,e.code))
  }
}

export {getMyOrders, deleteOrder}
