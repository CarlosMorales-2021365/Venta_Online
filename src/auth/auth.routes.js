import { Router } from "express"
import { register } from "./auth.controller.js"
import { registerValidator } from "../middlewares/user-validator.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
)

export default router