 import express from 'express';
 import {register,login,forgotPassword,resetPassword,GoogleLoginHandler} from '../controllers/auth' ;
 
 const router = express.Router();

 router.post("/register",register);
 router.post("/login",login);
 router.post("/googleLogin",GoogleLoginHandler)
 router.post("/forgotPassword",forgotPassword);
 router.put("/resetPassword/:resetToken",resetPassword);
 
 
export default router;
