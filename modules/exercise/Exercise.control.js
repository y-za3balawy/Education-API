import { Exercise } from "../../db/modules/exercise.js"
import { errorHandling } from "../../utilites/GlobalErrorHandling.js"
import { GlobalSearch } from '../../utilites/search.js';




const AddExercise =errorHandling(async (req,res,next)=>{

    const {Session, filetype, category, Variant, year, paper ,subject }= req.body
  
    if(req.files.length == false){
        return next(new Error('add file or note first '))
    }
    let data =[]
    for (const file of req.files) {
    
     
      data.push( await Exercise.create({ url:file.path , category ,filetype,Session,Variant, year, paper,subject})  )
    
    }
     
    
    if(!data){
        return next(new Error('can`t update your file '))
    
    }
    
    res.json({message:'done' , data})
    
    })

    const updateExercies = errorHandling(async(req,res,next)=>{

        const {Session, filetype, category, Variant, year, paper ,fileId }=req.body
        
        
        const file = await Exercise.findById(fileId)
        
        if(!file){
            return next(new Error('file not found'))
        }
        
         const data =await Exercise.findByIdAndUpdate(fileId,{Session, filetype, category, Variant, year, paper },{new :true})
        
         if(!data){
            return next(new Error('can`t update your file '))
        
        }
        
        res.json({message:'done' ,data})
        
        })
         
        const deleteExercies = errorHandling(async(req,res,next)=>{

            const {fileId}= req.body
            
            const file = await Exercise.findById(fileId)
            
            if(!file){
                return next(new Error('file not exist'))
            }
            
            
             const data = await Exercise.findByIdAndDelete(fileId)
            
             if(!data){
                return next(new Error('can`t delete this file'))
             }
            
             res.json({message:'done' ,data})
            
            
            })
            const AllExercies= errorHandling(async (req,res,next)=>{
                const {searchKey} =req.body
            
            const data= await Exercise.find(searchKey).populate('markschemID')
            if(!data){
                return next(new Error('no result'))
            }

            res.json({message:'doen' , data})
            
            })

        
           const searchExercies= GlobalSearch(Exercise)
            
    export{
        AddExercise,
        updateExercies,
        deleteExercies,
        AllExercies,
        searchExercies
    }