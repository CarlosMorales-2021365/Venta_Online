# Venta_Online

Para tener el proyecto de manera local en su ordenador, puede descargarlo como zip usando la opcion download zip o usando la terminal o cmd de ordenador, Para poder clonarlo primero ha que abrir la terminal desde la ruta que se desee descargar el proyecto y colocar el siguiente comando:
 
- git clone https://github.com/CarlosMorales-2021365/Venta_Online.git
 
Para poder iniciar el proyecto hay que abrir la consola dentro la carpeta del proyecto y colocar el siguiente comando para poder instalar las dependencias:
 
- npm i
 
Este comando intstalará las dependencias requeridas, luego para ejecutar el proyecto se debe ingresar el siguiente comando:
 
- npm run dev

 
> [!WARNING]
> Si no se sigue este siguiente punto no se podrá ejecutar correctamente este proyecto.

Para poder acceder al codigo del proyecto necesita tener instalado el programa visual studio code.

si ya tiene el programa debera colocar en la terminal en la ruta donde esta el proyecto el siguiente comando:

- code .
 
En este punto el servidor ya correrá en cierto puerto el cual va definido en el archivo .env pero para poder ejecutar el programa con la conecion a base de datos, hay que acceder al archivo .env y extraer el dato de: "URI_MONGO" y colocar su linea de coneccion a mongoDB. mongodb://localhost:27017 esta es la parte del comando que debe modificar lo demas se deja igual

si se hace de manfera correcta debera de crearse una base de datos llamada Venta_Online_2021365
 
Luego extraer la data que se encuentra en la carpeta configs/data/, y ahí se encontrarán los archivos para la base de datos.
 
En casi la misma ruta /configs , se encuentran la colleción de endpoints para probrar el programa en postman.
 
> [!CAUTION]
> Para que la documentación funciones el servidor debe estar activo/corriendo.
 
Para acceder a la documentación hay que escribir esta ruta en el navegador http://127.0.0.1:3005/api-docs
 
 
# Credenciales del usuario por defecto

  ```
    {
      name: "Admin"
      surname: "Admin"
      username: "admin"
      email: "Admin@gmail.com"
      password: encryptedPassword
      phone: 12345678
      role: "ADMIN_ROLE"
    }
  ```

# Credenciales de la categoria por defecto

 ```
    {
      name: "General"
    }
  ```
 
*Nota el token se puede conseguir en el enpoint de login y tiene una duración de 1h


*Nota: Como le comente en clase mi swagger esta incorrecto por lo que le mandare por este medio las rutas para el funcionamiento del programa 

# Ruta del programa
- http://127.0.0.1:3001

# Auth

- **Registrar Usuario**
  - **URL:** `/ventaOnline/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name":"String",
      "surname":"Sting",
      "username":"String",
      "email":"String",
      "password":"String",
      "profilePicture": "file",
      "phone":"String"
    }
    ```

- **Iniciar secion**
    - **URL:** `/ventaOnline/v1/auth/login`
    - **Método:** `POST`
    - **Cuerpo:**
    ```json
    {
    "email":"String",
    "password":"String"
    }
    ```

# User
 - **actualizar contraseña del Usuario**
   - **URL:** `/ventaOnline/v1/user/updatepassword/:uid`
    - **Método:** `PATCH`
    - **Cuerpo:**
    ```json
     {
    "newPassword":"Abc133**"
    }
    ```

 - **actualizar al Usuario**
    - **URL:** `/ventaOnline/v1/user/updateUser/:uid`
    - **Método:** `PUT`
    - **Cuerpo:**
    ```json
     {
    "name":"String",
    "surname":"String",
    "username":"String",
    "email":"String",
    "phone":"String"
    }
    ```

- **cambiar rol del Usuario**
    - **URL:** `/ventaOnline/v1/user/changeRole/:uid`
    - **Método:** `PATCH`
    - **Cuerpo:**
      ```json
       {
        "role":"ADMIN_ROLE"
      }
      ```

  - **Eliminar Usuario**
    - **URL:** `/ventaOnline/v1/user/deleteUser/:uid`
    - **Método:** `DELETE`
    - **Cuerpo:**
      ```json
       {
        "confirmacion":"Si"
      }
      ```

#Categorias

  - **Crear categorias**
    - **URL:** `/ventaOnline/v1/categorias/createCategoria`
    - **Método:** `POST`
    - **Cuerpo:**
      ```json
       {
        "name":"String"
      }
      ```

 - **Listar categorias**
    - **URL:** `/ventaOnline/v1/categorias/`
    - **Método:** `GET`


  - **Actualizar categorias**
    - **URL:** `/ventaOnline/v1/categorias/updateCategoria/:id`
    - **Método:** `PATCH`
    - **Cuerpo:**
      ```json
       {
        "name":"String"
      }
      ```

 - **Eliminar categorias**
    - **URL:** `/ventaOnline/v1/categorias/deleteCategorias/:id`
    - **Método:** `DELETE`

# Productos


  - **Crear Productos**
    - **URL:** `/ventaOnline/v1/productos/createProductos`
    - **Método:** `POST`
    - **Cuerpo:**
      ```json
       {
        "name":"String",
        "categoria":"Id de categoria",
        "precio":"String",
        "inventario":"String"
      }
      ```


- **Buscar Productos**
    - **URL:** `/ventaOnline/v1/productos/findProducto/:id`
    - **Método:** `GET`



- **Listar Productos**
    - **URL:** `/ventaOnline/v1/productos/`
    - **Método:** `GET`




- **Eiminar Productos**
    - **URL:** `/ventaOnline/v1/productos/deleteProducto/:id`
    - **Método:** `DELETE`




 - **Actualizar Productos**
    - **URL:** `/ventaOnline/v1/productos/updateProducto/:id`
    - **Método:** `PUT`
    - **Cuerpo:**
      ```json
       {
        "name":"String",
        "categoria":"Id de categoria",
        "precio":"String",
        "inventario":"String"
      }
      ```



- **Actualizar Campos Especificos de los Productos**
    - **URL:** `/ventaOnline/v1/productos/updateEspecificoProducto/:id`
    - **Método:** `PATCH`
    - **Cuerpo:**
      ```json
        Lo mismo que en el actualizar pero se puede decidir cuales se quiere editar y no es necesario mandar todos lo atributos
      ```



  - **Buscar Productos por Nombre**
    - **URL:** `/ventaOnline/v1/productos/findProductoByName/:nombre`
    - **Método:** `GET`


   - **Buscar Productos por Categoria**
    - **URL:** `/ventaOnline/v1/productos/getProductosByCategoria`
    - **Método:** `GET`
       ```json
        {
        "categoria":"Lacteos"
        }
      ```



- **Listar Productos por Cantidad de Ventas**
    - **URL:** `/ventaOnline/v1/productos/getProductosPorVenta`
    - **Método:** `GET`

# Carrito de Compras


  - **Crear Carrito**
    - **URL:** `/ventaOnline/v1/carrito/createCarrito`
    - **Método:** `POST`
    - **Cuerpo:**
      ```json
       {
        "productoId":"Id del producto",
        "cantidad":"String"
        }
      ```




- **Agregar Productos al Carrito**
    - **URL:** `/ventaOnline/v1/carrito/agregarProductoAlCarrito`
    - **Método:** `POST`
    - **Cuerpo:**
      ```json
       {
        "userId":"Id del usuario que creo el carrito",
        "productoId":"Id del producto",
        "cantidad":"String"
        }
      ```



# Compras


  - **Comprar**
    - **URL:** `/ventaOnline/v1/compra/comprar`
    - **Método:** `POST`
    - **Cuerpo:**
      ```json
       {
        "carritoId":"Id del carrito que se desea comprar"
        }
      ```


# Factura 

  - **Generar Factura**
    - **URL:** `/ventaOnline/v1/facturas/generarFactura/:compraId`
    - **Método:** `POST`



# Autor: 
  - nombre: Carlos André Morales Coy
  - carné: 2021365
  - usuario de git: CarlosMorales-2021365
  
