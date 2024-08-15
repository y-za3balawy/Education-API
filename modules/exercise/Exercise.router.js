

import { Router } from "express";
import { AddExercise, AllExercies, deleteExercies, searchExercies, updateExercies } from "./Exercise.control.js";
import { fileUpload, filterObject } from "../../utilites/multer.js";
import { authorization } from '../../mIddlewear/authorization.js';
import { authentcation } from '../../mIddlewear/authentcation.js';
import { validation } from "../../mIddlewear/validation.js";
import { AddExerciseSchema, AllExerciseSchema, UpdateExerciseSchema, deleteExerciseSchema } from "./Exercise.validation.js";

export const exerciseRouter = Router() 


exerciseRouter.post('/AddExercise' ,authentcation,authorization('Admin','suberAdmin'), fileUpload(filterObject.pdf).array('Exercise') , validation(AddExerciseSchema), AddExercise )
exerciseRouter.patch('/updateExercies' ,authentcation,authorization('Admin','suberAdmin'),  validation(UpdateExerciseSchema), updateExercies )
exerciseRouter.delete('/deleteExercies' ,authentcation,authorization('Admin','suberAdmin'),validation(deleteExerciseSchema), deleteExercies   )
exerciseRouter.get('/AllExercies' ,authentcation,authorization('Admin','suberAdmin'),  validation(AllExerciseSchema),  AllExercies)
exerciseRouter.get('/searchExercies' ,searchExercies)