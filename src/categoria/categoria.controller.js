'use strict';

import Categoria from "./categoria.model.js"


export const createCategoria = async (req, res) => {
    try{
        const data = req.body;
        const categoria = new Categoria(data);

        await categoria.save();

        res.status(200).json({
            success: true,
            categoria
        });
    }catch(error){
        res.status(500).json({
            success: false,
            error
        });
    }
}

export const getCategorias = async (req, res) =>{
    try{
        const { limite = 10, desde = 0} = req.query
        const query = { status: true }
        
        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                     .skip(Number(desde))
                     .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categorias
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        })
    }
    
}

export const updateCategoria = async (req, res) => {
    try{
        const  { id } = req.params;
        const data = req.body;

        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Categoria actualizada',
            categoria
        });
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la categoria',
            error: err.message
        }); 
    }
}

export const deleteCategoria = async (req, res) => {
    try{
        const { id } = req.params;

        const generalCategoria = await Categoria.findOne({ name: "General" });

        if (!generalCategoria) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró la categoría "General"'
            });
        }

 /*       await Publicaciones.updateMany(
            { categoria: id }, 
            { $set: { categoria: generalCategoria._id } } 
        );
*/
        await Categoria.findByIdAndUpdate(id, { status: false});

        res.status(200).json({
            success: true,
            message: 'Categoria eliminada'
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoria',
            error
        }); 
    }
}