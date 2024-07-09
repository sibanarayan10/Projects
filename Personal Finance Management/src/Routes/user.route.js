import express,{Router} from 'express'
import { registerUser,loginUser,logoutUser,updatePassword,updateProfile } from '../Controllers/user.controller';
const router=Router();
router.route('/register').post(registerUser);
router.route('/login').get(loginUser)
router.route('/updateProfile').post(updateProfile)
router.route('/updatePassword').post(updatePassword);
router.route('/logout').get(logoutUser)