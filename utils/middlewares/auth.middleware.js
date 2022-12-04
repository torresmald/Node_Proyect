const createError = require('../errors/createError.js');

const isAuth = (request, response, next) => {
    if(request.isAuthenticated()){
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

module.exports = isAuth;