
import joi from 'joi'
import { Types } from 'mongoose'

export const isvalidObject =  (value,helper)=>{

    if(Types.ObjectId.isValid(value)){
        return true
    }else{
        return helper.message('invalid object')
    
    }
    } 

const addMarkScheme=joi.object({
    paperId: joi.string().custom(isvalidObject).required()
})

const deletemarkschema = joi.object({
    fileId: joi.string().required()
})

export{
    addMarkScheme,
    deletemarkschema
}