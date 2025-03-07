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
];

export const getProductoByIdValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(productoExists),
    validarCampos,
    handleErrors
];

export const getProductoValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validarCampos,
    handleErrors
];

export const deleteProductoValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(productoExists),
    validarCampos,
    handleErrors
];

export const updateProductoValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(productoExists),
    validarCampos,
    handleErrors
];

export const updateProductoEspecificoValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(productoExists),
    validarCampos,
    handleErrors
];

export const getProductoByNameValidator = [
    param("nombre").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
];

export const getProductoByCategoriaValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];