import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const generarFacturaValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];