import Compras from "./compra.model.js"
import Carrito from "../carrito/carrito.model.js"
import Productos from "../productos/producos.model.js"

export const realizarCompra = async (req, res) => {
    try {
        const { carritoId } = req.body; 

        const carrito = await Carrito.findById(carritoId)
            .populate("productos.productoId");  

        if (!carrito) {
            return res.status(404).json({
                success: false,
                msg: "Carrito no encontrado",
            });
        }

        if (carrito.productos.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "El carrito está vacío",
            });
        }


        const nuevaCompra = new Compras({
            compra: [carritoId],  
        });

        for (const item of carrito.productos) {
            const producto = await Productos.findById(item.productoId);

            if (!producto) {
                return res.status(404).json({
                    success: false,
                    msg: `Producto con ID ${item.productoId} no encontrado`,
                });
            }

            if (Number(producto.inventario) < Number(item.cantidad)) {
                return res.status(400).json({
                    success: false,
                    msg: `No hay suficiente inventario para el producto ${producto.name}`,
                });
            }

            producto.inventario = (Number(producto.inventario) - Number(item.cantidad)).toString();

            producto.ventas = (Number(producto.ventas) + Number(item.cantidad)).toString();

            if (Number(producto.inventario) === 0) {
                producto.stock = "AGOTADO";
            }

            await producto.save();
        }

        await nuevaCompra.save();

        carrito.productos = [];
        await carrito.save();

        return res.status(200).json({
            success: true,
            msg: "Compra realizada exitosamente",
            compra: nuevaCompra,
        });
    } catch (error) {
        console.error("Error al realizar la compra:", error);
        return res.status(500).json({
            success: false,
            msg: "Error al realizar la compra",
            error: error.message,
        });
    }
};