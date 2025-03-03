import { Router } from "express";
import { createCategoria, getCategorias } from "./categoria.controller.js";
import { createCategoriaValidator, listarCategoriaValidator } from "../middlewares/categorias-validators.js";

const router = Router();

router.post("/createCategoria", createCategoriaValidator, createCategoria);

router.get("/", listarCategoriaValidator, getCategorias)

export default router;