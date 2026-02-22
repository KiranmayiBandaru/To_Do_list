import express from "express";
import { userRegistration, Userlogin } from "../controllers/userController";

const router = express.Router();

router.post('/users/register' , userRegistration);
router.post('/users/login' , Userlogin);




export default router;