import Carrito from "./carrito.model.js";
import Productos from "../productos/producos.model.js";

export const createCarrito = async (req, res) => {
    try {
        const { productoId, cantidad } = req.body;  
        console.log("Datos recibidos:", { productoId, cantidad });

        const { usuario } = req;  
        console.log("Usuario:", usuario);

        const productoRecord = await Productos.findById(productoId);
        if (!productoRecord) {
            console.log("Producto no encontrado");
            return res.status(404).json({
                success: false,
                msg: `No se encontró el producto con ID: ${productoId}`
            });
        }

        if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0 || Number(cantidad) > productoRecord.inventario) {
            console.log("Cantidad no válida");
            return res.status(400).json({
                success: false,
                msg: `La cantidad solicitada para el producto ${productoRecord.name} no es válida o excede el inventario disponible.`
            });
        }

        let carrito = await Carrito.findOne({ user: usuario._id, status: true });

        if (!carrito) {

            carrito = new Carrito({
                user: usuario._id,
                productos: [{ 
                    productoId: productoId, 
                    cantidad: cantidad.toString()  
                }]
            });
        } else {

            carrito.productos.push({
                productoId: productoId,
                cantidad: cantidad.toString(),  
            });
        }

        await carrito.save();

        const carritoConDatos = await Carrito.findById(carrito._id)
            .populate('productos.productoId') 
            .populate('user'); 

        return res.status(200).json({
            success: true,
            msg: `El carrito fue creado o actualizado exitosamente`,
            carrito: carritoConDatos
        });
    } catch (error) {
        console.log("Error al crear el carrito:", error); 
        return res.status(500).json({
            msg: "Error al crear el carrito",
            error
        });
    }
};

export const agregarProductoAlCarrito = async (req, res) => {
    try {
        const { userId, productoId, cantidad } = req.body;

        if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
            return res.status(400).json({
                success: false,
                message: "La cantidad debe ser un número mayor a 0.",
            });
        }

        const producto = await Productos.findById(productoId);
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        let carrito = await Carrito.findOne({ user: userId, status: true });

        if (!carrito) {
            carrito = new Carrito({
                user: userId,
                productos: [{
                    productoId: productoId,
                    cantidad: cantidad.toString(),  
                }],
            });
        } else {
            if (!carrito.productos) {
                carrito.productos = [];
            }

            const productoExistente = carrito.productos.find(item => item.productoId.toString() === productoId);

            if (productoExistente) {
                productoExistente.cantidad = (Number(productoExistente.cantidad) + Number(cantidad)).toString();
            } else {
                carrito.productos.push({
                    productoId: productoId,
                    cantidad: cantidad.toString(),
                });
            }
        }

        await carrito.save();

        const carritoConProductos = await Carrito.findById(carrito._id)
            .populate('productos.productoId') 
            .exec();

        res.status(200).json({
            success: true,
            message: "Producto agregado al carrito con éxito",
            data: carritoConProductos,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({
            success: false,
            message: "Error al agregar producto al carrito",
            error: error.message,
        });
    }
};