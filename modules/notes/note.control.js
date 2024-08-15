
import { filesModel } from '../../db/modules/notes.js';
import { GlobalSearch } from '../../utilites/search.js';
import { errorHandling } from '../../utilites/GlobalErrorHandling.js';



 

const AddFiles =errorHandling(async (req,res,next)=>{

const {category, chapter,filetype,subject}= req.body

if(req.files.length == false){
    return next(new Error('add file or note first '))
} 
let data =[]
for (const file of req.files) {

 
  data.push( await filesModel.create({name:file.originalname ,subject, url:file.path , category , chapter,filetype})  )

}
  

if(!data){
    return next(new Error('can`t update your file '))

}

res.json({ response:'done', message:'done' , data})

})

const UpdateFiles = errorHandling(async(req,res,next)=>{

const {category, chapter,filetype ,fileId ,name}=req.body


const file = await filesModel.findById(fileId)

if(!file){
    return next(new Error('file not found'))
}

 const data =await filesModel.findByIdAndUpdate(fileId,{category, chapter,filetype ,name},{new :true})

 if(!data){
    return next(new Error('can`t update your file '))

}

res.json({ response:'done', message:'done' ,data})

})

const deleteFile = errorHandling(async(req,res,next)=>{

const {fileId}= req.body

const file = await filesModel.findById(fileId)

if(!file){
    return next(new Error('file not exist'))
}


 const data = await filesModel.findByIdAndDelete(fileId)

 if(!data){
    return next(new Error('can`t delete this file'))
 }

 res.json({ response:'done', message:'done' ,data})


})

const Allnotes = errorHandling(async (req,res,next)=>{
  
    const {filetype , subject ,category} =req.body
    const {name} =req.query


const data= await filesModel.find({filetype , subject ,category ,name:{$regex:name} }).sort({chapter:'1'})

res.json({ response:'done', message:'done' , data})

})


const searchNote = GlobalSearch(filesModel)





export{
    AddFiles,
    UpdateFiles,
    deleteFile,
    Allnotes,
    searchNote,
    

}