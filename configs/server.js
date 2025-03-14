'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import { hash } from "argon2"
import User from "../src/user/user.model.js"
import Categoria from "../src/categoria/categoria.model.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoriasRoutes from "../src/categoria/categoria.routes.js"
import productoRoutes from "../src/productos/productos.routes.js"
import carritoRouter from "../src/carrito/carrito.routes.js"
import compraRouter from "../src/compra/compra.routes.js"
import facturaRouter from "../src/factura/factura.routes.js"
import { swaggerDocs, swaggerUi} from "./swagger.js";

const middelwares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const routes = (app) => {
    app.use("/ventaOnline/v1/auth", authRoutes)
    app.use("/ventaOnline/v1/user", userRoutes)
    app.use("/ventaOnline/v1/categorias", categoriasRoutes)
    app.use("/ventaOnline/v1/productos", productoRoutes)
    app.use("/ventaOnline/v1/carrito", carritoRouter)
    app.use("/ventaOnline/v1/compra", compraRouter)
    app.use("/ventaOnline/v1/facturas", facturaRouter)
}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

const crearAdministrador = async () =>{
    try{
        const adminExist = await User.findOne({role: "ADMIN_ROLE"});

        if(!adminExist){
            const encryptedPassword = await hash("Abc123**")

            const admin = new User({
                name: "Admin",
                surname: "Admin",
                username: "admin",
                email: "Admin@gmail.com",
                password: encryptedPassword,
                phone: 12345678,
                role: "ADMIN_ROLE"
            });

            await admin.save();
            console.log("Administrador inicial creado exitosamente")
        }

    }catch(err){
        console.log (`Error al crear al dminstrador inicial ${err}`)
    }
}

const crearCategoriaInicial = async ()=>{
    try{
        const categoriaExist = await Categoria.findOne({status: true});

        if(!categoriaExist){

            const categoria = new Categoria({
                name: "General"
            });
            await categoria.save();
            console.log("Categoria creada exitosamente")
        }
    }catch(err){
        console.log(`Error al crear la categoria ${err}`)
    }
}

export const initServer= () => {
    const app = express()
    try{
        middelwares(app)
        conectarDB()
        routes(app)
        crearAdministrador()
        crearCategoriaInicial()
        app.listen(process.env.PORT)
        console.log(`server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`server init failed: ${err}`)
    }
}