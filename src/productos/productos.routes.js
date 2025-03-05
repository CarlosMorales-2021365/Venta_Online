import { Router } from "express";
import { createProductos, getProductosById } from "./productos.controller.js";
import { createProductosValidator, getProductoByIdValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/createProductos", createProductosValidator, createProductos);

router.get("/findProducto/:id", getProductoByIdValidator, getProductosById);

export default router;