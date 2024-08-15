import { errorHandling } from "../../utilites/GlobalErrorHandling.js";
import { markSchemaModel } from './../../db/modules/markSchem.js';
import { Exercise } from './../../db/modules/exercise.js';



const AddMark =errorHandling(async(req,res,next)=>{

const {paperId}=req.body

if(!paperId){
    return next(new Error('past paper id is required'))
}
if(!req.file){
    return next(new Error('add file first'))
}


const data = await markSchemaModel.create({url:req.file.path})
await Exercise.findByIdAndUpdate(paperId ,{markschemID:data._id})

if(!data){
    return next(new Error('faild to add your file'))
}

res.json({response:'done',data })


})

const deleteMark = errorHandling(async(req,res,next)=>{
    const {fileId}=req.body


    const check = await  markSchemaModel.findById(fileId)

    if(!check){
        return next(new Error('file not found'))
    }

    const data = await markSchemaModel.findByIdAndDelete(fileId)

    if(!data){
        return next(new Error('can`t delete this file'))
    }

    res.json({response:'done',data })









})

export{
    AddMark,
    deleteMark
}