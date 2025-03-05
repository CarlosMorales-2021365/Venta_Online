import { Router } from "express";
import { createProductos } from "./productos.controller.js";
import { createProductosValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/createProductos", createProductosValidator, createProductos);

export default router;