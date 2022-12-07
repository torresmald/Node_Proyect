# API CON COLECCIÓN DE PELÍCULAS/CINES/SALAS DE CINE.

![Image Movies](https://c7.alamy.com/compes/h7gegn/coleccion-de-16…drados-negros-con-esquinas-redondeadas-h7gegn.jpg)

Bienvenido a la API con una coleccion de Películas, Cines, Salas de Cine y Usuarios. En esta API podrás acceder a recursos albergados en un Servidor Cloud en MongoAtlas utilizando MongoDB como BBDD. La API está desplegada utilizando Vercel como Host.

## HECHO CON

<p align="center"> 
      <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
    <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
    <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
</p>


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

## ENDPOINTS DISPONIBLES:
##### **LOS ENDPOINT TIPO GET ESTARÁN DISPONIBLES PARA USUARIOS DE TIPO USER Y ADMIN**.
##### **LOS ENDPOINT TIPO POST, PUT Y DELETE SÓLO ESTARÁN DISPONIBLES PARA USUARIOS DE TIPO ADMIN**.

###### <sub>IMAGENES EN FORMATO ÚNICAMENTE PNG, JPG, JPEG</sub>

1.  PELÍCULAS
    ```jsx
    1. GET
    - moviesRouter.get('/' --> OBTENER LISTADO DE TODAS LAS PELICULAS.
    - moviesRouter.get('/paged' --> LISTADO DE PELICULAS PAGINADAS EN BLOQUES DE 5 PELICULAS. 
    - moviesRouter.get('/id/:id' --> PELICULAS POR ID INDICADO.
    - moviesRouter.get('/genre/:genre' --> PELICULAS POR GENERO INDICADO. 
    - moviesRouter.get('/title/:title' --> PELICULAS POR TITULO INDICADO.
    - moviesRouter.get('/year/:year' --> PELICULAS POR AÑO INDICADO. 
    2. POST
    - moviesRouter.post('/' --> AÑADIR UNA PELÍCULA. POSIBILIDAD DE AÑADIR UNA IMAGEN.
    3. PUT
    - moviesRouter.put('/:id' --> EDITAR UNA PELÍCULA POR SU ID. 
    4. DELETE
    - moviesRouter.delete('/:id' --> ELIMINAR UNA PELÍCULA POR SU ID. SE BORRARÁ DEL CINE QUE LA TENGA EN CARTELERA. 
    ```
2.  CINES 
    ```jsx
    1. GET
    - cinemasRouter.get('/' --> OBTENER LISTADO DE TODOS LOS CINES.
    - cinemasRouter.get('/movie/:movie' --> LISTADO DE CINES QUE TENGAN LA PELICULA INDICADA EN CARTELERA.
    2. POST
    - cinemasRouter.post('/' --> AÑADIR UN CINE. POSIBILIDAD DE AÑADIR UNA IMAGEN.
    3. PUT
    - cinemasRouter.put('/:id' --> EDITAR UN CINE POR SU ID. 
    4. DELETE
    - cinemasRouter.delete('/:id' --> ELIMINAR UN CINE POR SU ID. 
    ```
3.  SALAS DE CINES 
    ```jsx
    1. GET
    - theaterRouter.get('/' --> OBTENER LISTADO DE TODAS LAS SALAS DE CINE.
    2. POST
    - theaterRouter.post('/' --> AÑADIR UNA SALA DE CINE.
    3. PUT
    - theaterRouter.put('/:id' --> EDITAR UNA SALA DE CINE POR SU ID. 
    4. DELETE
    - theaterRouter.delete('/:id' --> ELIMINAR UNA SALA DE CINE POR SU ID. 
    ```
4.  USUARIOS
    ```jsx
    1. GET
    - userRouter.get('/' --> OBTENER LISTADO DE TODOS LOS USUARIOS.
    2. POST
    - userRouter.post('/register' --> POSIBILIDAD DE REGISTRARSE. SE REQUIERE UN USERNAME Y UN PASSWORD. EMAIL Y TIPO DE ROL OPCIONALES.
    - userRouter.post('/login' --> POSIBILIDAD DE LOGUEARSE UNA VEZ REGISTRADO. 
    - userRouter.post('/logout' --> POSIBILIDAD DE DESLOGUEARSE. 
    3. PUT
    - userRouter.put('/editUser/:id' --> EDITAR UN USUARIO POR SU ID.
    - userRouter.put('/addFavoriteMovie' --> POSIBILIDAD DE AÑADIR A UN USUARIO SUS PELÍCULAS FAVORITAS. 
    userRouter.put('/removeFavoriteMovie' --> POSIBILIDAD DE ELIMINAR A UN USUARIO SUS PELÍCULAS FAVORITAS.
    4. DELETE
    - userRouter.delete('/:id' --> ELIMINAR UN USUARIO POR SU ID. AL HACERLO, SE RESTARA 1 DEL CONTADOR DE PELICULAS FAVORITAS QUE TENGA DICHO USUARIO.
    ```

## RECURSOS

- https://www.mongodb.com/atlas/database
- https://vercel.com/
- https://cloudinary.com/
- https://www.postman.com/


## CONTACTO

Project Repo: https://github.com/torresmald/Node_Proyect

DIVIERTETE USANDOLA!!

