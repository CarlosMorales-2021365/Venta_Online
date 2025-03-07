import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";


export const createCarritoValidator = [
    validateJWT,
    body("user").notEmpty().withMessage("El usuario es requerido"),
    validarCampos,
    handleErrors
]

export const agregarAlCarritoValidator = [
    validateJWT,
    body("userId").notEmpty().withMessage("El usuario es requerido"),
    validarCampos,
    handleErrors
]

