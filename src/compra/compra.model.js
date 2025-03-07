import { Schema, model } from "mongoose";

const comprasSchema = new Schema({
    status:{
        type: Boolean,
        default: true
    },
    compra:[{
        type: Schema.Types.ObjectId,
        ref: "Carrito"
    }]
},{
    versionKey: false,
    timestamps: true
})

export default model('Compras', comprasSchema)