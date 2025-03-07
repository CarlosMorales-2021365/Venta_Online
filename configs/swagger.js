import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor Interfer API",
            version: "1.0.0",
            description: "API para gestionar las empresas que desean ingresar a la feria Interfer",
            contact:{
                name: "Carlos Morales",
                email: "cmorales-2021365@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/intefer/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/empresa/empresa.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}