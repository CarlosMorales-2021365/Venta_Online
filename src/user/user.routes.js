import { Router } from "express";
import { updatePassword } from "./user.controller.js";
import { updatePasswordValidator } from "../middlewares/user-validator.js";


const router = Router()

router.patch("/updatepassword/:uid", updatePasswordValidator, updatePassword)

export default router