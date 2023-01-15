import { Request, Response } from "express";
import { connection } from "../config/db";
import { IResponse, responseData, STATUS_CODE, STATUS_MESSAGE } from "../models/responseModel";
import { User } from "../models/userModel";

const listBuildings = async (req: Request, res:Response)=>{
  const data = req.body as User
  try{
    const select = 'SELECT DISTINCT name,level,id FROM places ORDER BY name';
    const [resultselect] = await ((await connection).query(select));
    (resultselect as any[]).forEach(e=>{
      if(!!e.level){
        e.name = `${e.name}  ชั้นที่ ${e.level}`
      }
    })
    return  res.status(200).json(responseData(STATUS_MESSAGE.success,'s',resultselect))
  }
  catch(err:any){
    return  res.status(500).json(responseData(STATUS_MESSAGE.error,'err',err.code+' : '+err.message))
  }
}


export{listBuildings}
