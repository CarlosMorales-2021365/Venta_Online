import { Router } from "express";
import { updatePassword, updateUser, updateProfilePicture, changeRole} from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator, changeUserRoleValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.patch("/updatepassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"),
updateProfilePictureValidator, updateProfilePicture)

router.patch("/changeRole/:uid", changeUserRoleValidator,changeRole)



export default router