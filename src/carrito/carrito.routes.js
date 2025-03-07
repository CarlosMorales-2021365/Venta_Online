import { Router } from "express"
import { createCarrito, agregarProductoAlCarrito } from "./carrito.controller.js"
import { createCarritoValidator, agregarAlCarritoValidator } from "../middlewares/carrito-validator.js"

const router = Router()

router.post("/createCarrito",createCarritoValidator, createCarrito);

router.post("/agregarProductoAlCarrito", agregarAlCarritoValidator, agregarProductoAlCarrito);

export default router
