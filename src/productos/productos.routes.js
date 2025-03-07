import { Router } from "express";
import { createProductos, getProductosById, getProductos, deleteProducto, updateProducto, updateProductoEspecifico, getProductosByName, getProductosByCategoria, listarProductosPorVentas } from "./productos.controller.js";
import { createProductosValidator, getProductoByIdValidator, getProductoValidator, deleteProductoValidator, updateProductoValidator, updateProductoEspecificoValidator, getProductoByNameValidator, getProductoByCategoriaValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/createProductos", createProductosValidator, createProductos);

router.get("/findProducto/:id", getProductoByIdValidator, getProductosById);

router.get("/", getProductoValidator, getProductos);

router.delete("/deleteProducto/:id", deleteProductoValidator, deleteProducto);

router.put("/updateProducto/:id", updateProductoValidator, updateProducto);

router.patch("/updateEspecificoProducto/:id", updateProductoEspecificoValidator, updateProductoEspecifico);

router.get("/findProductoByName/:nombre", getProductoByNameValidator, getProductosByName);

router.get("/getProductosByCategoria", getProductoByCategoriaValidator, getProductosByCategoria);

router.get("/getProductosPorVenta", getProductoByCategoriaValidator, listarProductosPorVentas)

export default router;