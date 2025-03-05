import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { productoExists } from "../helpers/db-validators.js";

export const createProductosValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("categoria").notEmpty().withMessage("La categoria es requerida"),
    body("precio").notEmpty().withMessage("El precio es requerido"),
    validarCampos,
    handleErrors
]