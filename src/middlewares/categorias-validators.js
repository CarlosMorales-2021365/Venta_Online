import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCategoriaValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
]

export const listarCategoriaValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validarCampos,
    handleErrors
]