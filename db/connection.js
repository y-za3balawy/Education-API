import mongoose from "mongoose";


export function dbconnection(params) {
    

    mongoose.connect(process.env.connect).then(()=>{
        console.log('db connected......')
    }).catch((error)=>{
console.log('DB connection error' , error)
    })


}