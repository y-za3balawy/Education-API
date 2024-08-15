


import joi from 'joi'

const AddExerciseSchema = joi.object({
    Session:joi.string().required(),
     filetype:joi.string().valid('Question Paper','Mark Scheme').required(),
      category:joi.string().valid('cambridge' , 'oxford' ,'edexcel').required(),
       Variant:joi.number().required(),
        year:joi.number().required(),
         paper:joi.string().required(),
         subject:joi.string().valid('economics' , 'business').required()
}) 
const UpdateExerciseSchema = joi.object({
    Session:joi.string(),
     filetype:joi.string().valid('Question Paper','Mark Scheme'),
      category:joi.string().valid('cambridge' , 'oxford' ,'edexcel'),
       Variant:joi.number(),
        year:joi.number(),
         paper:joi.string(),
    fileId:joi.string().required(),
    subject:joi.string().valid('economics' , 'business')


}) 
const  deleteExerciseSchema = joi.object({
    
    fileId:joi.string().required(),

})

const AllExerciseSchema = joi.object({

    
        Session:joi.string(),
        filetype:joi.string().valid('Question Paper','Mark Scheme'),
         category:joi.string().valid('cambridge' , 'oxford' ,'edexcel'),
    Variant:joi.number(),
    subject:joi.string().valid('economics' , 'business'),
      
            paper:joi.string(),
            name:joi.string().allow('')
    
    
    


}) 
export{
    AddExerciseSchema
    ,UpdateExerciseSchema,
    deleteExerciseSchema,
    AllExerciseSchema
}