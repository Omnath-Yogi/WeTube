import express from 'express';
import {loginUser,registerUser,userInformation} from '../controllers/userController.js'
import { historyUpdate } from '../controllers/videoController.js';

 const userRouter =  express.Router();


userRouter.post('/login',loginUser)

userRouter.post('/register',registerUser)
userRouter.post('/historyUpdate',historyUpdate)
userRouter.post('/:userId',userInformation)


export default userRouter