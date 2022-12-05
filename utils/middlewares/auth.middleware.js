//* MIDDLEWARE PARA LA COMPROBACION DEL ROL DEL USUARIO
//? GENERAMOS 2 FUNCIONES PARA COMPROBAR EL GRADO PRIVILEGIOS DE UN USUARIO. CIERTOS ENDPOINTS SOLO ESTARÁN ACCESIBLES PARA USUARIOS ADMIN.

const createError = require('../errors/createError.js');

const isAuth = (request, response, next) => {
    if(request.isAuthenticated() && request.user.role === "user"){
        next();
    } else {
        return next((createError('No tienes permisos para acceder, haz login/register para acceder.', 401)))
    }
}
const isAuthAdmin = (request, response, next) => {
    if(request.isAuthenticated() && request.user.role === "admin"){
        next();
    } else {
        return next((createError('No tienes permisos para acceder, haz login/register para acceder', 401)))
    }
}

module.exports = isAuth, isAuthAdmin;