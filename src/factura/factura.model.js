import { Schema, model } from "mongoose";

const facturaSchema = new Schema({
    compra: {
        type: Schema.Types.ObjectId,
        ref: "Compras"
    },
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    productos: [{
        nombre: String,
        cantidad: String,
        precio: String,
        totalProducto: String
    }]
}, {
    versionKey: false,
    timestamps: true
});

export default model('Factura', facturaSchema);