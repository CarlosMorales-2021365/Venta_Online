import { Router } from "express";
import { updatePassword, updateUser, updateProfilePicture, changeRole, deleteUser} from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator, changeUserRoleValidator, deleteClientValidator, deleteAdminValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.patch("/updatepassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"),
updateProfilePictureValidator, updateProfilePicture)

router.patch("/changeRole/:uid", changeUserRoleValidator,changeRole)

router.delete("/deleteUser/:uid", deleteClientValidator, deleteUser)

router.delete("/deleteUserAdmin/:uid", deleteAdminValidator, deleteUser)

export default router