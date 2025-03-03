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