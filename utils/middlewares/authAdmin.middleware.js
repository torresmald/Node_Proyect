//* MIDDLEWARE PARA LA COMPROBACION DEL ROL DEL USUARIO Y AUTENTICACION. 
//? GENERAMOS 1 FUNCION PARA COMPROBAR EL GRADO PRIVILEGIOS DE UN USUARIO. CIERTOS ENDPOINTS SOLO ESTARÁN ACCESIBLES PARA USUARIOS ADMIN.
const createError = require('../errors/createError.js');

const isAuthAdmin = (request, response, next) => {
    if(request.isAuthenticated() && request.user.role === "admin"){
        return next();
    } else {
        return next((createError('No tienes permisos para acceder, haz login / register para acceder', 401)))
    }
}

module.exports =  isAuthAdmin;