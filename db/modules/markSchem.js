import { Schema, model } from "mongoose";




const markSchema =new Schema({
    url:{type:String , require:true},
    


},{timestamps:true})



export const markSchemaModel = model('markSchema' , markSchema)