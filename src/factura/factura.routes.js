import { Router } from "express";
import { generarFactura } from "./factura.controller.js";
import { generarFacturaValidator } from "../middlewares/factura-validator.js";

const router = Router();

/**
 * @swagger
 * /generarFactura/{compraId}:
 *   post:
 *     summary: Generar una factura
 *     tags: [Factura]
 *     parameters:
 *       - in: path
 *         name: compraId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la compra
 *     responses:
 *       201:
 *         description: Factura generada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Factura generada correctamente
 *                 pdf:
 *                   type: string
 *                   example: /path/to/factura.pdf
 *                 factura:
 *                   type: object
 *                   properties:
 *                     compra:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     total:
 *                       type: number
 *                       example: 1000
 *                     fecha:
 *                       type: string
 *                       example: 2025-03-07T00:00:00.000Z
 *                     productos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             example: Laptop
 *                           cantidad:
 *                             type: string
 *                             example: 2
 *                           precio:
 *                             type: string
 *                             example: 500
 *                           totalProducto:
 *                             type: string
 *                             example: 1000
 *       400:
 *         description: No hay productos en esta compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No hay productos en esta compra
 *       404:
 *         description: Compra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Compra no encontrada
 *       500:
 *         description: Error al generar la factura
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al generar la factura
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.post("/generarFactura/:compraId", generarFacturaValidator, generarFactura);

export default router;