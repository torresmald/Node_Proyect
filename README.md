# API CON COLECCIÓN DE PELÍCULAS/CINES/SALAS DE CINE.

![Image Movies](https://c7.alamy.com/compes/h7gegn/coleccion-de-16…drados-negros-con-esquinas-redondeadas-h7gegn.jpg)

Bienvenido a la API con una coleccion de Películas, Cines, Salas de Cine y Usuarios. En esta API podrás acceder a recursos albergados en un Servidor Cloud en MongoAtlas utilizando MongoDB como BBDD. La API está desplegada utilizando Vercel como Host.

## RECURSOS UTILIZADOS:

- POSTMAN --> Lanzamiento de peticiones.
- CLOUDINARY --> HOST de Imágenes.
- VERCEL --> Host para deploy de la API.

### DEPENDENCIAS UTILIZADAS

- BCRYPT--> Para la encriptación/desencriptacion de las password de Users.
- CLOUDINARY--> Host de imágenes utilizado para subir las imagenes de cines/películas desde el servidor.
- CONNECT-MONGO--> Necesario para poder guardar en la BBDD las sesiones de los usuarios. 
- CORS--> Evitamos problemas de origen cruzado al utilizar Postman para lanzar las peticiones.
- DOTENV--> Dependencia que nos permite utilizar las variables de entorno y securizar la aplicación.
- EXPRESS--> Framework utilizado como entorno de desarrollo. 
- EXPRESS SESION--> Permite la gestión de sesiones de usuario.
- MONGOOSE--> Para la conexión con la BBDD de MongoDB.
- MULTER--> Nos permite la subida de archivos por parte del usuario al servidor.
- PASSPORT--> Librería de autenticación utilizada.
- PASSPORT-LOCAL--> Nos permite crear una estrategia de autenticacion para registro/login.

#### DEPENDENCIAS DE DESARROLLO:

- NODEMON--> Utilizada durante el desarrollo de la aplicación para comprobar chequear los cambios en el código y recargar el Servidor. 

#### ENDPOINTS DISPONIBLES:
##### **LOS ENDPOINT TIPO POST, PUT Y DELETE SÓLO ESTARÁN DISPONIBLES PARA USUARIOS DE TIPO ADMIN**.
###### <sub>IMAGENES EN FORMATO ÚNICAMENTE PNG, JPG, JPEG</sub>


- PELÍCULAS --> 
    1. GET --> OBTENER LISTADO DE TODAS LAS PELÍCULAS, PELICULAS POR ID, POR AÑO, POR TÍTULO, POR GENERO Y PÁGINADAS EN BLOQUES DE 5 PELÍCULAS.
    2. POST--> POSIBILIDAD DE AÑADIR UNA NUEVA PELÍCULA.
    3. PUT--> POSIBILIDAD DE EDITAR UNA PELÍCULA YA EXISTENTE.
    4. DELETE--> ELIMINAR UNA PELÍCULA POR ID.

- CINES -->
    1. GET --> OBTENER LISTADO TODOS LOS CINES, CINES POR PELÍCULAS.
    2. POST--> POSIBILIDAD DE AÑADIR UN NUEVO CINE.
    3. PUT--> POSIBILIDAD DE EDITAR UN CINE YA EXISTENTE.
    4. DELETE--> ELIMINAR UN CINE POR ID.

- SALAS --> 
    1. GET --> OBTENER LISTADO TODAS LAS SALAS DE CINE.
    2. POST--> POSIBILIDAD DE AÑADIR UNA NUEVA SALA DE CINE.
    3. PUT--> POSIBILIDAD DE EDITAR UNA SALA EXISTENTE.
    4. DELETE--> ELIMINAR UNA SALA POR ID.

- USUARIOS --> 
    1. GET --> OBTENER LISTADO DE TODOS LOS USUARIOS REGISTRADOS.
    2. POST--> POSIBILIDAD DE REGISTRARSE, LOGUEARSE, DESLOGUEARSE.
    3. PUT--> POSIBILIDAD DE EDITAR UN USUARIO Y AÑADIR PELÍCULAS A SU COLECCION DE PELÍCULAS FAVORITAS.
    4. DELETE--> ELIMINAR UNA USUARIO POR ID.


# Contact

Project Repo: https://github.com/torresmald/Node_Proyect

`Diviertete usandola!`


