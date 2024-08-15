

import joi from 'joi'

const  AddNoteSchema = joi.object({
    category: joi.string().valid('cambridge' , 'oxford' ,'edexcel').required(),
    chapter:joi.string(),
    filetype:joi.string().valid('note','classified').required(),
    subject:joi.string().valid('economics' , 'business').required()
})
const  UpdatefileSchema = joi.object({
    category: joi.string().valid('cambridge' , 'oxford' ,'edexcel'),
    chapter:joi.string(),
    name:joi.string(),
    filetype:joi.string().valid('note','classified'),
    fileId:joi.string().required(),
    subject:joi.string().valid('economics' , 'business')

})
const  deletefileSchema = joi.object({
    
    fileId:joi.string().required(),

})
  
const  AllfileSchema = joi.object({
 
         category: joi.string().valid('cambridge' , 'oxford' ,'edexcel'),
    filetype:joi.string().valid('note','classified'),
    subject:joi.string().valid('economics' , 'business')
 ,
    chapter:joi.string(),
    name:joi.string().allow('')
   

})
export{
    AddNoteSchema,
    UpdatefileSchema,
    deletefileSchema,
    AllfileSchema
}