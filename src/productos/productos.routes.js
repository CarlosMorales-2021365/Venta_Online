import { Router } from "express";
import { createProductos, getProductosById, getProductos, deleteProducto, updateProducto, updateProductoEspecifico, getProductosByName, getProductosByCategoria, listarProductosPorVentas } from "./productos.controller.js";
import { createProductosValidator, getProductoByIdValidator, getProductoValidator, deleteProductoValidator, updateProductoValidator, updateProductoEspecificoValidator, getProductoByNameValidator, getProductoByCategoriaValidator } from "../middlewares/productos-validators.js";

const router = Router();

/**
 * @swagger
 * /createProductos:
 *   post:
 *     summary: Create a new product
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Laptop
 *               categoria:
 *                 type: string
 *                 description: Category ID
 *                 example: 60d0fe4f5311236168a109ca
 *               precio:
 *                 type: string
 *                 description: Product price
 *                 example: 1000
 *               inventario:
 *                 type: string
 *                 description: Product inventory
 *                 example: 50
 *               stock:
 *                 type: string
 *                 description: Product stock status
 *                 example: EN_STOCK
 *     responses:
 *       200:
 *         description: Product created successfully
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
 *                   example: El producto fue creado exitosamente
 *                 productos:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Laptop
 *                     categoria:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     precio:
 *                       type: string
 *                       example: 1000
 *                     inventario:
 *                       type: string
 *                       example: 50
 *                     stock:
 *                       type: string
 *                       example: EN_STOCK
 *       404:
 *         description: Category not found
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
 *                   example: No se encontro la categoria
 *       500:
 *         description: Error creating product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error al crear el producto
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /findProducto/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 producto:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Laptop
 *                     categoria:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     precio:
 *                       type: string
 *                       example: 1000
 *                     inventario:
 *                       type: string
 *                       example: 50
 *                     stock:
 *                       type: string
 *                       example: EN_STOCK
 *       404:
 *         description: Product not found
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
 *         description: Error retrieving product
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
 *                   example: Error al obtener el producto
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limit the number of products
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         required: false
 *         description: Offset for products
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Laptop
 *                       categoria:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109ca
 *                       precio:
 *                         type: string
 *                         example: 1000
 *                       inventario:
 *                         type: string
 *                         example: 50
 *                       stock:
 *                         type: string
 *                         example: EN_STOCK
 *       500:
 *         description: Error retrieving products
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
 *                   example: Error al obtener los productos
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /deleteProducto/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                   example: Producto eliminado
 *                 producto:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Laptop
 *                     categoria:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     precio:
 *                       type: string
 *                       example: 1000
 *                     inventario:
 *                       type: string
 *                       example: 50
 *                     stock:
 *                       type: string
 *                       example: DESCONTINUADO
 *       500:
 *         description: Error deleting product
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
 *                   example: Error al elimimnar el producto
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /updateProducto/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Laptop
 *               categoria:
 *                 type: string
 *                 description: Category ID
 *                 example: 60d0fe4f5311236168a109ca
 *               precio:
 *                 type: string
 *                 description: Product price
 *                 example: 1000
 *               inventario:
 *                 type: string
 *                 description: Product inventory
 *                 example: 50
 *               stock:
 *                 type: string
 *                 description: Product stock status
 *                 example: EN_STOCK
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: Producto actualizado
 *                 producto:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Laptop
 *                     categoria:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     precio:
 *                       type: string
 *                       example: 1000
 *                     inventario:
 *                       type: string
 *                       example: 50
 *                     stock:
 *                       type: string
 *                       example: EN_STOCK
 *       500:
 *         description: Error updating product
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
 *                   example: Error al actualizar el producto
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /updateEspecificoProducto/{id}:
 *   patch:
 *     summary: Update specific fields of a product
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Laptop
 *               categoria:
 *                 type: string
 *                 description: Category ID
 *                 example: 60d0fe4f5311236168a109ca
 *               precio:
 *                 type: string
 *                 description: Product price
 *                 example: 1000
 *               inventario:
 *                 type: string
 *                 description: Product inventory
 *                 example: 50
 *               stock:
 *                 type: string
 *                 description: Product stock status
 *                 example: EN_STOCK
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: Producto actualizado
 *                 producto:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Laptop
 *                     categoria:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     precio:
 *                       type: string
 *                       example: 1000
 *                     inventario:
 *                       type: string
 *                       example: 50
 *                     stock:
 *                       type: string
 *                       example: EN_STOCK
 *       500:
 *         description: Error updating product
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
 *                   example: Error al actualizar el producto
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /findProductoByName/{nombre}:
 *   get:
 *     summary: Get products by name
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Product name
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 producto:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Laptop
 *                       categoria:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109ca
 *                       precio:
 *                         type: string
 *                         example: 1000
 *                       inventario:
 *                         type: string
 *                         example: 50
 *                       stock:
 *                         type: string
 *                         example: EN_STOCK
 *       404:
 *         description: No products found with that name
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
 *                   example: No se encontraron productos con ese nombre
 *       500:
 *         description: Error retrieving products
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
 *                   example: Error al obtener el producto
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /getProductosByCategoria:
 *   get:
 *     summary: Get products by category
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *                 description: Category name
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                   example: Productos encontrados con éxito
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Laptop
 *                       categoria:
 *                         type: string
 *                         example: Electronics
 *                       precio:
 *                         type: string
 *                         example: 1000
 *                       inventario:
 *                         type: string
 *                         example: 50
 *                       stock:
 *                         type: string
 *                         example: EN_STOCK
 *       404:
 *         description: Category not found
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
 *                   example: Categoría no encontrada
 *       404:
 *         description: No products found for this category
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
 *                   example: No se encontraron productos para esta categoría
 *       500:
 *         description: Error retrieving products
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
 *                   example: Error al obtener los productos
 *                 error:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /getProductosPorVenta:
 *   get:
 *     summary: Get top-selling products
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Laptop
 *                       categoria:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109ca
 *                       precio:
 *                         type: string
 *                         example: 1000
 *                       inventario:
 *                         type: string
 *                         example: 50
 *                       stock:
 *                         type: string
 *                         example: EN_STOCK
 *                       ventas:
 *                         type: string
 *                         example: 100
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *              // filepath: c:\Users\Admin\Desktop\
 */

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