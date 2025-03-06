import { Router } from "express";
import { createProductos, getProductosById, getProductos, deleteProducto } from "./productos.controller.js";
import { createProductosValidator, getProductoByIdValidator, getProductoValidator, deleteProductoValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/createProductos", createProductosValidator, createProductos);

router.get("/findProducto/:id", getProductoByIdValidator, getProductosById);

router.get("/", getProductoValidator, getProductos);

router.delete("/deleteProducto/:id", deleteProductoValidator, deleteProducto)

export default router;