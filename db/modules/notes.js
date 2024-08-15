import { Schema, model } from "mongoose";






const notesSchema = new Schema({
   

        category:{type:String, require:true , enum:['cambridge' , 'oxford' ,'edexcel' ]},
        chapter:{type:Number  },
        name:{type:String  },
        url:{type:String , require:true},
        filetype:{type:String , require:true , enum:['note','classified']},
        subject:{type:String, require:true , enum:['economics' , 'business']},


        

   

},{timestamps:true})

export const filesModel =  model( 'note', notesSchema )