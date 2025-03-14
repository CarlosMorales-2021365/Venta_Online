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
    productos: {
        type: [{
            productoId: {
                type: Schema.Types.ObjectId,
                ref: "Productos",
                required: true
            },
            cantidad: {
                type: String,
                required: true,
                minlength: 1
            }
        }]
    }
},{
    versionKey: false,
    timestamps: true
})

export default model('Carrito', carritoSchema)