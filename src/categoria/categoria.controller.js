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