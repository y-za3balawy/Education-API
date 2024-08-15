import express from 'express'
import dotenv from 'dotenv'
import { dbconnection } from './db/connection.js'
import { global_error_handlingh } from './utilites/GlobalErrorHandling.js'
import { userRouter } from './modules/user/user.router.js';
import { filesRouter } from './modules/notes/note.router.js';
import { exerciseRouter } from './modules/exercise/Exercise.router.js';
import cors from 'cors'
import { markRouter } from './modules/markScheme/mark.router.js';



const app = express()
const port =process.env.PORT || 3000
app.use(express.json())
dotenv.config()
app.use(cors())

app.use(userRouter)
app.use(markRouter)
app.use(filesRouter)
app.use(exerciseRouter)
app.use(global_error_handlingh)
dbconnection()


app.use('*' , (req ,  res ,  next)=>{
    new Error('Error 404 ')
    })
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))