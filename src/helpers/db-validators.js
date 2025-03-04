import User from "../user/user.model.js"
import Categoria from "../categoria/categoria.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoriaExists = async (id = " ") => {
    const existe = await Categoria.findById(id)
    if(!existe){
        throw new Error("No existe la categoria con el ID proporcionado")
    }
}

export const isClient = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
    if(User.role !== "CLIENT_ROLE"){
        throw new Error("Solo se pueden editar un usuario con un rol de cliente")
    }
}
