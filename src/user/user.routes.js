import { Router } from "express";
import { updatePassword, updateUser } from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator } from "../middlewares/user-validator.js";


const router = Router()

router.patch("/updatepassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

export default router