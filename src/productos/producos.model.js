import { Schema, model } from "mongoose";

const productosSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    categoria:{
        type:Schema.ObjectId,
        ref: "Categoria",
        required: true
    },
    inventario:{
        type: String,
    },
    stock:{
        type:String,
        enum: ["EN_STOCK", "AGOTADO", "DESCONTINUADO"],
        default: "EN_STOCK"
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamps: true
})

export default model('Productos', productosSchema)