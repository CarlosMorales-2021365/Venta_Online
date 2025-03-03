import { Router } from "express";
import { createCategoria, getCategorias, updateCategoria } from "./categoria.controller.js";
import { createCategoriaValidator, listarCategoriaValidator, updateCategoriasValidator } from "../middlewares/categorias-validators.js";

const router = Router();

router.post("/createCategoria", createCategoriaValidator, createCategoria);

router.get("/", listarCategoriaValidator, getCategorias)

router.patch("/updateCategoria/:id", updateCategoriasValidator, updateCategoria);

export default router;