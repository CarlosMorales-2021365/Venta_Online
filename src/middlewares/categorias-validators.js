import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoriaExists } from "../helpers/db-validators.js";

export const createCategoriaValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
];

export const listarCategoriaValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validarCampos,
    handleErrors
];

export const updateCategoriasValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(categoriaExists),
    validarCampos,
    handleErrors
];