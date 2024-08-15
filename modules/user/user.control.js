import { UserModel } from "../../db/modules/user.js";
import { errorHandling } from "../../utilites/GlobalErrorHandling.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { sendemail } from './../../utilites/send.email.js';
import { htmlcode } from "../../utilites/email.later.js";
import  Jwt  from 'jsonwebtoken';
import { token_model } from "../../db/modules/token.js";
import randomstring from  'randomstring'

const signIn =errorHandling(async(req,res,next)=>{

const {name,email, password , repassword } = req.body

const user =await UserModel.findOne({email})

if(user){
    return next(new Error('email already exist'))
}
if(password != repassword){
    return next(new Error('password and repassword not match'))
}

const hashPass = bcrypt.hashSync(password ,8)

const activationcode = crypto.randomBytes(64).toString('hex')


const data = await UserModel.create({name , email , password:hashPass , activationcode })

const link = `http://localhost:3000/confirmEmail/${activationcode}`;

const  isSend =await  sendemail({to:email  , subject:'confirm your email Mr/Mahmoud za3balawy website' , html:htmlcode(link)})
if(isSend){
    res.json({message:'review your Email to confirm and login',data})
}else{
    next(new Error("something wrong"))
}

})

const ActivateAccount =errorHandling(async(req,res,next)=>{

    const  {activationcode} =req.params  

    const user = await UserModel.findOneAndUpdate({activationcode},{confirm:true , $unset:{activationcode:1}} ,{new:true})
    
    if(!user){  
        return next(new Error("user not found"))

    }

    if(user.email == 'yzabalawy@gmail.com'){
        await UserModel.findByIdAndUpdate(user.id,{role:'suberAdmin'})
    }

    return  res.json({message:'done', user})

})

const LogIn = errorHandling(async(req,res,next)=>{

    const {password, email} = req.body

    const checkUser = await UserModel.findOne({email})
    if(!checkUser){
        return next(new Error('signUp first'))
    } 
  if(!checkUser.confirm){
        return next(new Error('confirm your email first'))
    }
    if(!bcrypt.compareSync(password, checkUser.password)){
        return next(new Error('incorrect password'))
    }
    await UserModel.findOneAndUpdate({email},{isonline:true} ,{new :true})

    const token = Jwt.sign({name:checkUser.name, id:checkUser.id} , process.env.tokenKey)

    await token_model.create({token ,user:checkUser._id , isvalid:true,agent:req.headers['user-agent'] })

    res.json({message:'done' ,'token': token})
})
const LogOut = errorHandling(async (req,res,next)=>{

    const {token} = req.headers 

    const data=  Jwt.verify(token ,process.env.tokenKey )

    const user = await UserModel.findByIdAndUpdate(data.id,{isonline:false} ,{new :true})
    const userToken = await token_model.findOneAndDelete({user:data.id})


    if (user ==false || userToken==false ) {
        return next(new Error('can`t logout'))
        
    }

    res.json({message:'done'})




})

const forgetPassword = errorHandling(async(req,res,next)=>{
    const{email}=req.body

    const user = await UserModel.findOne({email})

    if(!user){
        return next(new Error('email not found') )
    }

    const code = randomstring.generate({length:5 , charset:'numiric'})

   const isSend =  sendemail({to:email , subject:'reset password' , html:htmlcode('' , code)})

   if(!isSend){
    return next(new Error('cant send email to you'))
   }
   user.forgetcode = code;
   await user.save();
   res.json({ response:'done', message:'reviwe your Email for vacation code '})

})

const resetPassword = errorHandling(async(req,res,next)=>{

const {forgetcode , Newpassword} = req.body

const data = await UserModel.findOne({forgetcode})

if(!data){
    return next(new Error('wrong code'))
}

  const hashPassword = bcrypt.hashSync(Newpassword , 8)

 await UserModel.findOneAndUpdate({email:data.email} ,{password:hashPassword , $unset:{forgetcode:1}} , {new:true})

 const tokens= await token_model.find({user:data._id})

    tokens.forEach(async (x)=>{

 await token_model.findOneAndUpdate({_id:x._id} ,{isvalid:false})

    })

    res.json({ response:'done',message:'done logIn now'}) 

})

const upgradeUser = errorHandling(async(req,res,next)=>{

    const {email ,role}=req.body

    const user = await UserModel.findOne({email})

    if(!user){
        return next(new Error('user not found'))
    }

    const data = await UserModel.findOneAndUpdate({email},{role})

    if(!data){
       return next(new Error('can`t update user'))
    }

    res.json({message:'done'})

})

const deleteUser = errorHandling(async(req,res,next)=>{
    const {email} =req.body
     
    const user = await UserModel.findOne({email})

    if(!user){
        return next(new Error('user not found'))
    }

  const data=   await UserModel.findOneAndDelete({email})

  if(!data){
    return next(new Error('can`t update user'))
 }

 res.json({message:'done'})

})

export{
    signIn,
    ActivateAccount,
    LogIn,
    LogOut,
    forgetPassword,
    resetPassword,
    upgradeUser,
    deleteUser
}