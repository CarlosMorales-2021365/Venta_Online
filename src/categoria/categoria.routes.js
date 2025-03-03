import { Router } from "express";
import { createCategoria } from "./categoria.controller.js";
import { createCategoriaValidator } from "../middlewares/categorias-validators.js";

const router = Router();

router.post("/createCategoria", createCategoriaValidator, createCategoria);

export default router;