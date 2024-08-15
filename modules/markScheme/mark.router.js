
import { Router } from "express";
import { authentcation } from "../../mIddlewear/authentcation.js";
import { authorization } from "../../mIddlewear/authorization.js";
import { fileUpload, filterObject } from "../../utilites/multer.js";
import { AddMark, deleteMark } from "./mark.control.js";
import { validation } from "../../mIddlewear/validation.js";
import { addMarkScheme, deletemarkschema } from "./mark.validation.js";


export const markRouter = Router()


markRouter.post('/AddMarkScheme' , authentcation,authorization('Admin','suberAdmin') , fileUpload(filterObject.pdf).single('markScheme'),validation(addMarkScheme) , AddMark) 
markRouter.delete('/deleteMark' , authentcation,authorization('Admin','suberAdmin'), validation(deletemarkschema) , deleteMark) 