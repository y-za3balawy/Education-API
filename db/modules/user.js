import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{type:String,
         require:true,
         minLength:[0],
         maxLength:[20]
        },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
   
    confirm:{
        type:Boolean,
        default:false
    },
    isonline:{
        type:Boolean,
        default:false,
        
    },
    role:{
        type:String,
        default:'user',
        enum:['Admin','suberAdmin','user']
    },
    forgetcode:String, 
    activationcode:String,
},{timestamps:true})

export const UserModel = model('user' , userSchema)