import { Router } from "express";
import { createProductos, getProductosById, getProductos, deleteProducto, updateProducto, updateProductoEspecifico, getProductosByName } from "./productos.controller.js";
import { createProductosValidator, getProductoByIdValidator, getProductoValidator, deleteProductoValidator, updateProductoValidator, updateProductoEspecificoValidator, getProductoByNameValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/createProductos", createProductosValidator, createProductos);

router.get("/findProducto/:id", getProductoByIdValidator, getProductosById);

router.get("/", getProductoValidator, getProductos);

router.delete("/deleteProducto/:id", deleteProductoValidator, deleteProducto);

router.put("/updateProducto/:id", updateProductoValidator, updateProducto);

router.patch("/updateEspecificoProducto/:id", updateProductoEspecificoValidator, updateProductoEspecifico)

router.get("/findProductoByName/:nombre", getProductoByNameValidator, getProductosByName)

export default router;