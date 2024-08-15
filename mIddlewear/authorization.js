import { errorHandling } from "../utilites/GlobalErrorHandling.js"



export const authorization = (role , role2)=>{
    return errorHandling(async (req,res,next)=>{
        if(role  !== req.user.role && role2  !== req.user.role ){
            next(new Error('you are not allowed to do this'))
        }else{
            next()
        }
    })

}