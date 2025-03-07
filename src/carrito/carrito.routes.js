import { Router } from "express"
import { createCarrito, agregarProductoAlCarrito } from "./carrito.controller.js"
import { createCarritoValidator, agregarAlCarritoValidator } from "../middlewares/carrito-validator.js"

const router = Router()

/**
 * @swagger
 * /createCarrito:
 *   post:
 *     summary: Crear un nuevo carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productoId:
 *                 type: string
 *                 description: ID del producto
 *                 example: 60d0fe4f5311236168a109ca
 *               cantidad:
 *                 type: number
 *                 description: Cantidad del producto
 *                 example: 2
 *     responses:
 *       200:
 *         description: Carrito creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: El carrito fue creado exitosamente
 *                 carrito:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     productos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productoId:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109ca
 *                           cantidad:
 *                             type: string
 *                             example: 2
 *       400:
 *         description: Cantidad no válida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: La cantidad solicitada para el producto no es válida o excede el inventario disponible.
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: No se encontró el producto con ID: 60d0fe4f5311236168a109ca
 *       500:
 *         description: Error al crear el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error al crear el carrito
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /agregarProductoAlCarrito:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario
 *                 example: 60d0fe4f5311236168a109ca
 *               productoId:
 *                 type: string
 *                 description: ID del producto
 *                 example: 60d0fe4f5311236168a109ca
 *               cantidad:
 *                 type: number
 *                 description: Cantidad del producto
 *                 example: 2
 *     responses:
 *       200:
 *         description: Producto agregado al carrito con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Producto agregado al carrito con éxito
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     productos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productoId:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109ca
 *                           cantidad:
 *                             type: string
 *                             example: 2
 *       400:
 *         description: Cantidad no válida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: La cantidad debe ser un número mayor a 0.
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error al agregar producto al carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al agregar producto al carrito
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.post("/createCarrito",createCarritoValidator, createCarrito);

router.post("/agregarProductoAlCarrito", agregarAlCarritoValidator, agregarProductoAlCarrito);

export default router
