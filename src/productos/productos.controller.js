import Productos from "./producos.model.js"
import Categoria from "../categoria/categoria.model.js"

export const createProductos = async (req, res) =>{
    try{
        const { categoria, name, inventario, stock, precio} = req.body;
        
        const categoriaRecord = await Categoria.findOne({ _id: categoria });
        if(!categoriaRecord){
            console.log(categoria);
            return res.status(404).json({
                success: false,
                msg: "No se encontro la categoria"
            });
        }

        const productos = new Productos({categoria, name, inventario, stock, precio});
        await productos.save();

        const productosdatosCategoria = await Productos.findById(productos._id)
            .populate('categoria');

            return res.status(200).json({
                success: true,
                msg: `El producto fue creado exitosamente`,
                productos: productosdatosCategoria
            })
    }catch(error){
        return res.status(500).json({
            msg: "Error al crear el producto",
            error
        });
    }
}

export const getProductosById = async (req, res) => {
    try{
      const { id } = req.params;
      const producto = await Productos.findById(id)
      
      if(!producto){
        return res.status(404).json({
            success: false,
            message: "Producto no encontrado"
        })
      }

      return res.status(200).json({
        success: true,
        producto
      })
    }catch{
        return res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: err.message
        })
    }
}

export const getProductos = async (req, res) => {
    try{
        const { limite = 10, desde = 0 } = req.query
        const query = { status: true }

        const [total, productos] = await Promise.all([
            Productos.countDocuments(query),
            Productos.find(query)
                     .skip(Number(desde))
                     .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            productos
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        })
    }
}