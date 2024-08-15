





export  function errorHandling (x){

    return (req,res,next)=>{
        x(req,res,next).catch((error)=>{
            return next(new Error(error))
        })
    }



}



export  const global_error_handlingh = (error,req,res,next)=>{

    return res.json({ response:'error', message: error.message   ,stack: error.stack } )
    // return res.json({ response:'error', message: " global error", err: error.message  ,stack: error.stack } )


}