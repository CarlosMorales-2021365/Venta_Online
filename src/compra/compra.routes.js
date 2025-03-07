import { Router } from "express";
import { realizarCompra } from "../compra/compra.controller.js";
import { compraValidator } from "../middlewares/compra-validator.js"

const router = Router();

router.post("/comprar", compraValidator, realizarCompra);

export default router;