import Factura from "./factura.model.js"
import Compras from "../compra/compra.model.js"
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generarFactura = async (req, res) => {
    try {
        const { compraId } = req.params;

        // Buscar la compra por ID y hacer el populate correctamente
        const compra = await Compras.findById(compraId)
            .populate({
                path: 'compra', // Populamos el campo 'compra' que es un array de carritos
                populate: {
                    path: 'productos.productoId',  // Aseguramos de traer los productos del carrito
                    model: 'Productos' // El modelo al que hace referencia
                }
            });

        if (!compra) {
            return res.status(404).json({
                mensaje: "Compra no encontrada"
            });
        }

        // Aplanar los productos de todos los carritos
        const productos = compra.compra.flatMap(carrito => carrito.productos);

        if (!productos || productos.length === 0) {
            return res.status(400).json({
                mensaje: "No hay productos en esta compra"
            });
        }

        let totalFactura = 0;
        const detallesProductos = productos.map(producto => {
            const precio = producto.productoId.precio ? parseFloat(producto.productoId.precio) : 0;
            const cantidad = producto.cantidad ? parseFloat(producto.cantidad) : 0;

            if (isNaN(precio) || isNaN(cantidad)) {
                return null;
            }

            const totalProducto = (precio * cantidad).toString();
            totalFactura += precio * cantidad;

            return {
                nombre: producto.productoId.nombre,
                cantidad: cantidad.toString(),
                precio: precio.toString(),
                totalProducto
            };
        }).filter(item => item !== null);

        if (detallesProductos.length === 0) {
            return res.status(400).json({
                mensaje: "Algunos productos tienen datos inválidos"
            });
        }

        const totalFacturaStr = totalFactura.toString();

        // Crear y guardar la factura
        const factura = new Factura({
            compra: compra._id,
            total: totalFacturaStr,
            productos: detallesProductos
        });

        await factura.save();

        // Generar el PDF de la factura con pdfkit
        const doc = new PDFDocument();

        // Definir la carpeta 'uploads/facturas' dentro de 'public' para guardar el PDF
        const rutaCarpeta = path.join(__dirname, '..', '..', 'public', 'uploads', 'facturas');
        const rutaPDF = path.join(rutaCarpeta, `factura_${factura._id}.pdf`);

        // Crear la carpeta 'facturas' si no existe
        if (!fs.existsSync(rutaCarpeta)) {
            fs.mkdirSync(rutaCarpeta, { recursive: true });
        }

        // Crear el flujo para guardar el PDF
        doc.pipe(fs.createWriteStream(rutaPDF));

        // Título de la factura
        doc.fontSize(18).text('Factura de Compra', { align: 'center' });

        // Información de la compra
        doc.fontSize(12).text(`ID de Compra: ${compra._id}`);
        doc.text(`Fecha: ${compra.createdAt}`);
        doc.text(`Total: $${totalFacturaStr}`);

        // Detalles de los productos
        doc.text('Productos Comprados:');
        detallesProductos.forEach((producto, index) => {
            doc.text(`Producto ${index + 1}:`);
            doc.text(`Nombre: ${producto.nombre}`);
            doc.text(`Cantidad: ${producto.cantidad}`);
            doc.text(`Precio: $${producto.precio}`);
            doc.text(`Total: $${producto.totalProducto}`);
            doc.text('------------------------');
        });

        // Finalizar el documento
        doc.end();

        // Retornar la respuesta con la ruta del archivo PDF generado
        return res.status(201).json({
            mensaje: "Factura generada correctamente",
            pdf: rutaPDF, // Devolvemos la ruta del archivo PDF
            factura: factura // Devolvemos la factura registrada
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error al generar la factura",
            error
        });
    }
};