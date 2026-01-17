import express from 'express';
import {loginUser,registerUser,userInformation} from '../controllers/userController.js'

 const userRouter =  express.Router();


userRouter.post('/login',loginUser)

userRouter.post('/register',registerUser)
userRouter.post('/:userId',userInformation)

export default userRouter