//* MIDDLEWARE PARA LA COMPROBACION DE AUTENTICACION DEL USUARIO. 
//? GENERAMOS 1 FUNCION PARA COMPROBAR QUE EL USUARIO ESTÉ AUTENTICADO. CIERTOS ENDPOINTS SOLO ESTARÁN ACCESIBLES PARA USUARIOS ADMIN.

const createError = require('../errors/createError.js');

const isAuth = (request, response, next) => {
    if(request.isAuthenticated()){
       return next();
    } else {
        return next((createError('No tienes permisos para acceder, haz login/register para acceder.', 401)))
    }
}

module.exports =  isAuth;
