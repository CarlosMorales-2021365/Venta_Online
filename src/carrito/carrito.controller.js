import Carrito from "./carrito.model.js";
import User from "../user/user.model.js";
import Productos from "../productos/producos.model.js";

export const createCarrito = async ( req, res) => {
    try{
        const { productos} = req.body;
        const { usuario } = req;

        const productoRecord = await Productos.findOne({_id: productos });
        if(!productoRecord){
            console.log(productos);
            return res.status(404).json({
                success: false,
                msg: "No se encontro el producto"
            });
        }

        const carrito = new Carrito({productos, user: usuario._id});
        await carrito.save();

        const carritoConDatos = await Carrito.findById(carrito._id)
            .populate('productos')
            .populate('user');

            return res.status(200).json({
                success: true,
                msg: `El carrito fue creado exitosamente`,
                carrito: carritoConDatos
            });
    }catch(error){
        return res.status(500).json({
            msg: "Error al crear el carrito",
            error
        })
    }
}

export const agregarProductoAlCarrito = async (req, res) => {
    try {
        const { userId, productoId } = req.body;

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
                productos: [productoId],
            });
        } else {
            carrito.productos.push(productoId);  
        }

        await carrito.save();

        const carritoConProductos = await Carrito.findById(carrito._id)
            .populate('productos')  
            .exec();

        res.status(200).json({
            success: true,
            message: "Producto agregado al carrito con éxito",
            data: carritoConProductos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al agregar producto al carrito",
            error: error.message,
        });
    }
};