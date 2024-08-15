import { Schema, model ,Types} from "mongoose";




const exerciseSchema =new Schema({
    fileType:{type:String ,require:true , enum:['Question Paper','Mark Scheme' ] },
    category:{type:String, require:true , enum:['cambridge' , 'oxford' ,'edexcel' ]},
    paper:{type:String, require:true },
    Session:{type:String, require:true },
    year:{type:Number , require:true},
    Variant:{type:Number , require:true},
    url:{type:String , require:true},
    subject:{type:String, require:true , enum:['economics' , 'business']},
    markschemID:{type: Types.ObjectId, ref:'markSchema'} 


})
 


export const Exercise = model('ppxercise' , exerciseSchema)