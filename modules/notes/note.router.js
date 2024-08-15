

import { Router } from "express";

export const filesRouter = Router()
import { AddFiles, Allnotes, UpdateFiles, deleteFile, searchNote } from "./note.control.js";
import { fileUpload, filterObject } from "../../utilites/multer.js";
import { authorization } from '../../mIddlewear/authorization.js';
import { authentcation } from '../../mIddlewear/authentcation.js';
import { validation } from "../../mIddlewear/validation.js";
import { AddNoteSchema, AllfileSchema, UpdatefileSchema, deletefileSchema } from "./note.validation.js";

filesRouter.post('/AddFiles' ,authentcation,authorization('Admin','suberAdmin'), fileUpload(filterObject.pdf).array('file') ,validation(AddNoteSchema), AddFiles  )
filesRouter.patch('/UpdateFiles' ,authentcation,authorization('Admin','suberAdmin'),validation(UpdatefileSchema), UpdateFiles  )
filesRouter.delete('/deleteFile' ,authentcation,authorization('Admin','suberAdmin'),validation(deletefileSchema), deleteFile   )
filesRouter.post('/Allnotes' ,validation(AllfileSchema),Allnotes)
filesRouter.get('/searchNote' ,searchNote)