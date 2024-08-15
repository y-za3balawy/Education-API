import { token_model } from "../db/modules/token.js";
import { errorHandling } from "../utilites/GlobalErrorHandling.js";
import { UserModel } from './../db/modules/user.js';
import  Jwt  from "jsonwebtoken";

export const authentcation= errorHandling(async(req,res,next)=>{
    const {token}  =  req.headers 
    
    if(!token){
        next(new Error('token required'))
    }
    const check_token =  await token_model.findOne({token})
    
    if(!check_token){
        next(new Error('token expired'))
    }
    const decoded =  Jwt.verify(token , process.env.tokenKey)
    
    if(!decoded){
        next(new Error('invalid token'))
    }
    const user = await UserModel.findOne({_id:decoded.id})
    if(!user){
        next(new Error('user not found'))
    }
    // res.json({message:'done' , decoded})
    
    req.user = user
    
    
    return next()
    })
