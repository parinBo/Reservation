import { Request, Response } from "express";
import { connection } from "../config/db";
import { responseData, STATUS_CODE, STATUS_MESSAGE } from "../models/responseModel";
import * as jwt from 'jsonwebtoken'
import moment from 'moment-timezone';
import { getUser } from "./userController";
const listTimes:any[] = [
  {id:1,time:'08.00-09.00'},
  {id:2,time:'09.00-10.00'},
  {id:3,time:'10.00-11.00'},
  {id:4,time:'11.00-12.00'},
  {id:5,time:'12.00-13.00'},
  {id:6,time:'13.00-14.00'},
  {id:7,time:'14.00-15.00'},
  {id:8,time:'15.00-16.00'},
  {id:9,time:'16.00-17.00'},
  {id:10,time:'17.00-18.00'},
]


const getSeat = async (req:Request, res:Response) => {
  const data:any =  req.query
  try{
    if(data.nameId && parseInt(data.timeId)){
      const user:any = jwt.decode(req.headers['authorization'] || '');
      const userId = (await getUser(user.username)).id;
      const seats = await getSeatData(data,userId);
      res.status(parseInt(STATUS_CODE.OK)).json(responseData('s',STATUS_CODE.OK,seats))
    }else{
      let err = '';
      if(!data.nameId) err += '<br>-โปรดเลือกสถานที่';
      if(!parseInt(data.timeId)) {
        err += '<br>-โปรดเลือกเวลา';
      }
      res.status(parseInt(STATUS_CODE.BAD_REQUEST)).json(responseData('s',STATUS_CODE.BAD_REQUEST,err))
    }
  }catch(e:any){
    res.status(parseInt(STATUS_CODE.INTERNAL_SERVER_ERROR)).json(responseData('s',STATUS_CODE.INTERNAL_SERVER_ERROR,e.code))
  }
}

const getSeatData = async (data:any, userId: string)=>{
  const times: string = listTimes.find(e=>e.id === parseInt(data.timeId))?.time.replace(/\./g,':').split('-');
  const selectSeatOrder = `SELECT o.seat_id,o.user_id as id FROM orders o WHERE o.seat_id  IN
  (SELECT id FROM seats WHERE place_id = ?) AND o.start_time >= ? and o.end_time <= ?`;
  const selectSeat = `SELECT id,status FROM seats where place_id = ?`
  const [orders] = await ((await connection).query(selectSeatOrder,[data.nameId,`${data.date} ${times[0]}`, `${data.date} ${times[1]}`]));
  const [seats] = await ((await connection).query(selectSeat,[data.nameId]));
  (orders as any[]).forEach(order=>{
    const s = (seats as any[]).find(e => e.id === order.seat_id);
    if(s) {
      s.status = 1;
    }
    if(order.id === userId && !!s){
      s.status = 2;
    }
  })
  return seats;
}

const bookSeat = async (req: Request, res:Response) => {
  const data = req.body;
  try{
    const times: string = listTimes.find(e=>e.id === parseInt(data.timeId))?.time.replace(/\./g,':').split('-');
    const startTime = `${data.date} ${times[0]}`
    const endTime = `${data.date} ${times[1]}`
    const user:any = jwt.decode(req.headers['authorization'] || '');
    const userId = (await getUser(user.username)).id;
    const insertOrder = `INSERT INTO orders(user_id,seat_id,create_date,start_time,end_time)
      VALUES(?,?,?,?,?)`
    const [resultInsert]:any = (await (await connection).query(insertOrder,[userId,data.seatId, moment().format(),startTime,endTime]))
    const seats = await getSeatData({nameId: data.nameId,date: data.date, timeId: data.timeId},userId);
    res.status(parseInt(STATUS_CODE.OK)).json(responseData(STATUS_MESSAGE.success,STATUS_CODE.OK,seats))

  }catch(e:any){
    res.status(parseInt(STATUS_CODE.INTERNAL_SERVER_ERROR)).json(responseData('s',STATUS_CODE.INTERNAL_SERVER_ERROR,e.code))
  }

}


export {getSeat, bookSeat}
