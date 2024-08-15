
import express from 'express'
import { authorization } from '../../mIddlewear/authorization.js'
import { authentcation } from '../../mIddlewear/authentcation.js'
import { validation } from '../../mIddlewear/validation.js'

import { deleteuserSchema, forget_schema, login_schema, registration, resetPassword_schema, upgradeUserSchema } from './user.validate.js';
import { ActivateAccount, LogIn, LogOut, deleteUser, forgetPassword, resetPassword, signIn, upgradeUser } from './user.control.js';
import { fileUpload, filterObject } from '../../utilites/multer.js';
import { UserModel } from '../../db/modules/user.js';
 
export const userRouter = express.Router() 

userRouter.post('/signIn' , validation(registration),signIn )
userRouter.get('/confirmEmail/:activationcode' , ActivateAccount)
userRouter.post('/LogIn' , validation(login_schema),LogIn)
userRouter.patch('/LogOut'  ,authentcation, LogOut)
userRouter.patch('/forgetPassword' , validation(forget_schema),forgetPassword)
userRouter.patch('/resetPassword' , validation(resetPassword_schema), resetPassword) 
userRouter.patch('/upgradeUser' ,authentcation,authorization('suberAdmin') ,validation(upgradeUserSchema),upgradeUser)
userRouter.delete('/deleteUser' ,authentcation,authorization('suberAdmin') ,validation(deleteuserSchema),deleteUser)
