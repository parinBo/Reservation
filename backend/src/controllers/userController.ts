import { Request, Response } from "express";
import { connection } from "../config/db";
import { IResponse, responseData, STATUS_CODE, STATUS_MESSAGE } from "../models/responseModel";
import { User } from "../models/userModel";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
const signUp = async (req: Request, res:Response)=>{
  const data = req.body as User
  const insert = 'INSERT INTO `users`(role_id,username,password,fname,lname) VALUES(?,?,?,?,?)';
  const select =  'SELECT count(username) FROM `users` where username = ?'
  const [resultselect] = await ((await connection).query(select,[data.username]));
  if((resultselect as any)[0]['count(username)'] > 1 ){
    return res.status(200).json(responseData('มีผู้ใช้บัญชีนี้แล้ว','e',))
  }else{
    try{
      const hash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
      const [resultInsert] = await ((await connection).query(insert,[data.role_id, data.username, hash, data.fname, data.lname]));
      return  res.status(201).json(responseData(STATUS_MESSAGE.success,'s','s'))
    }catch(err:any){
      return  res.status(500).json(responseData(STATUS_MESSAGE.error,'err',err.code+' : '+err.message))
    }
  }
  return  res.status(200).json(resultselect)
}

const signin = async (req: Request, res:Response)=>{
  const data = req.body as User
  const select = 'select username,password,role_id from users where username = ?';
  try{
    const [resultselect] = await ((await connection).query(select,[data.username]));
    if((resultselect as any[]).length > 0){
      const user = (resultselect as any)[0] as User
      const passwordCorrect = bcrypt.compareSync(data.password,user.password)
      if(passwordCorrect){
        const payload = {
          name:user.fname,
          username: user.username,
          role:user.role_id
        }
        const token = jsonwebtoken.sign(payload,process.env.JWT_SECRET_TOKEN as string,{
           expiresIn: '1h'
        });
        return res.status(200).json(responseData(STATUS_MESSAGE.success,'s',token))
      }else{
        return res.status(200).json(responseData('บัญชีผู้ใช้ไม่ถูกต้อง','e'))
      }
    }else{
      return res.status(200).json(responseData('บัญชีผู้ใช้ไม่ถูกต้อง','e'))
    }
  }catch(err:any){
    return  res.status(500).json(responseData(STATUS_MESSAGE.error,'err',err.code+' : '+err.message))
  }
}

const getUser = async (username: string)=>{
  const select = 'select id,username,password,role_id from users where username = ?';
  const [resultselect]:any = await ((await connection).query(select,[username]));
  return resultselect[0];
}

export{signUp, signin, getUser}
