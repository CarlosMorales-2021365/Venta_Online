import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    productos:[{
        type: Schema.Types.ObjectId,
        ref:"Productos"
    }]
},{
    versionKey: false,
    timestamps: true
})

export default model('Carrito', carritoSchema)