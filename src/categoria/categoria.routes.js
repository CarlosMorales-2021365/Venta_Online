import { Router } from "express";
import { createCategoria, getCategorias, updateCategoria, deleteCategoria } from "./categoria.controller.js";
import { createCategoriaValidator, listarCategoriaValidator, updateCategoriasValidator, deleteCategoriasValidator } from "../middlewares/categorias-validators.js";

const router = Router();

router.post("/createCategoria", createCategoriaValidator, createCategoria);

router.get("/", listarCategoriaValidator, getCategorias)

router.patch("/updateCategoria/:id", updateCategoriasValidator, updateCategoria);

router.delete("/deleteCategorias/:id", deleteCategoriasValidator, deleteCategoria);

export default router;