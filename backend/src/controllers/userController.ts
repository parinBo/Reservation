import { Request, Response } from "express";
import { connection } from "../config/db";
import { IResponse, responseData, STATUS_CODE, STATUS_MESSAGE } from "../models/responseModel";
import { User } from "../models/userModel";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const signUp = async (req: Request, res:Response)=>{
  const data = req.body as User
  let userExist = false;
  const insert = 'INSERT INTO `User`(role_id,username,password,fname,lname) VALUES(?,?,?,?,?)';
  const select =  'SELECT count(username) FROM `User` where username = ?'
  const [resultselect] = await ((await connection).query(select,[data.username]));
  if((resultselect as any)[0]['count(username)'] > 1 ){
    return res.status(200).json(responseData(STATUS_MESSAGE.success,'sameAccount','บัญชีนี้มีผู้ใช้งานแล้ว'))
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
  const select = 'select username,password,role_id from User where username = ?';
  try{
    const [resultselect] = await ((await connection).query(select,[data.username]));
    console.log(resultselect);
    if((resultselect as any[]).length > 0){
      const user = (resultselect as any)[0] as User
      const passwordCorrect = bcrypt.compareSync(data.password,user.password)
      if(passwordCorrect){
        const payload = {
          name:user.fname,
          username: user.username,
          role:user.role_id
        }
        const secret = 'ReservtionWeb';
        const token = jsonwebtoken.sign(payload, secret);
        res.cookie("SESSIONID", token, {httpOnly:true, secure:true});
        return res.status(200).json(responseData(STATUS_MESSAGE.success,'s',true))
      }else{
        return res.status(200).json(responseData(STATUS_MESSAGE.error,'e','รหัสผ่านไม่ถูกต้อง'))
      }
    }else{
      return res.status(200).json(responseData(STATUS_MESSAGE.error,'e','บัญชีนี้ยังไม่ได้สมัครเข้าสู่ระบบ'))
    }
  }catch(err:any){
    return  res.status(500).json(responseData(STATUS_MESSAGE.error,'err',err.code+' : '+err.message))
  }



}

export{signUp, signin}
