import { Router } from "express";
import { generarFactura } from "./factura.controller.js";
import { generarFacturaValidator } from "../middlewares/factura-validator.js";

const router = Router();

router.post("/generarFactura/:compraId", generarFacturaValidator, generarFactura);

export default router;