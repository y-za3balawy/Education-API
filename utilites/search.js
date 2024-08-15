import { errorHandling } from "./GlobalErrorHandling.js"







export  function GlobalSearch(model) {
    return  errorHandling(async(req,res,next)=>{

        const {name}= req.body

        const data = await model.find({name:{$regex:name}})

        if(!data){
            return next(new Error('no result'))
        }

        res.json({message:'done' , data})


    })
}