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

export const deleteProducto = async (req, res) => {
    try{
        const { id } = req.params

        const producto = await Productos.findByIdAndUpdate(id, { status: false, stock: "DESCONTINUADO"}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Producto eliminado",
            producto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al elimimnar el producto",
            error: err.message
        })
    }
}

export const updateProducto = async ( req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const producto = await Productos.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Producto actualizado",
            producto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        })
    }
}

export const updateProductoEspecifico = async (req, res) =>{
    try{
        const { id } = req.params;
        const data = req.body;

        const datos = ['name', 'categoria', 'precio', 'inventario', 'stock', 'status'];

        const updateEspecifico = Object.keys(data).reduce((acc, key) => {
            if (datos.includes(key)) {
                acc[key] = data[key];
            }
            return acc;
        }, {});

        const producto = await Productos.findByIdAndUpdate(id, updateEspecifico, { new: true });

        res.status(200).json({
            success: true,
            msg: "Producto actualizado",
            producto
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        })
    }
}

export const getProductosByName = async (req, res) => {
    try{
      const { nombre } = req.params;
      const producto = await Productos.find({ name: { $regex: nombre, $options: 'i' } });
      
      if (producto.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No se encontraron productos con ese nombre"
        });
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

export const getProductosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.body; 
        let filtro = {};

        if (categoria !== undefined) {
            const categoriaEncontrada = await Categoria.findOne({ name: categoria });

            if (!categoriaEncontrada) {
                return res.status(404).json({
                    success: false,
                    message: "Categoría no encontrada",
                });
            }

            filtro['categoria'] = categoriaEncontrada._id;
        }

        const productos = await Productos.find(filtro)
            .populate('categoria', 'name');  

        if (productos.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron productos para esta categoría",
            });
        }

        res.status(200).json({
            success: true,
            message: "Productos encontrados con éxito",
            data: productos,
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        });
    }
};