import express from 'express';
import upload from '../middlewares/multer.js';
import {addVideo} from '../controllers/adminController.js'
import {auth,adminOnly} from '../middlewares/auth.js'
const adminRouter =  express.Router();


adminRouter.post('/add',auth,adminOnly,upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),addVideo)



export default adminRouter;