import { Router } from "express";
import { createProductos, getProductosById, getProductos } from "./productos.controller.js";
import { createProductosValidator, getProductoByIdValidator, getProductoValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/createProductos", createProductosValidator, createProductos);

router.get("/findProducto/:id", getProductoByIdValidator, getProductosById);

router.get("/", getProductoValidator, getProductos);

export default router;