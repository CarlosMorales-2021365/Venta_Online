import { Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Categoria', categoriaSchema);