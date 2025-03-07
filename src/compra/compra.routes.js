import { Router } from "express";
import { realizarCompra } from "../compra/compra.controller.js";
import { compraValidator } from "../middlewares/compra-validator.js"

const router = Router();

/**
 * @swagger
 * /comprar:
 *   post:
 *     summary: Realizar una compra
 *     tags: [Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carritoId:
 *                 type: string
 *                 description: ID del carrito
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Compra realizada exitosamente
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
 *                   example: Compra realizada exitosamente
 *                 compra:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     compra:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109ca
 *       400:
 *         description: El carrito está vacío
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
 *                   example: El carrito está vacío
 *       404:
 *         description: Carrito no encontrado
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
 *                   example: Carrito no encontrado
 *       500:
 *         description: Error al realizar la compra
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
 *                   example: Error al realizar la compra
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.post("/comprar", compraValidator, realizarCompra);

export default router;