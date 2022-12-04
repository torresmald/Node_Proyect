const createError = require('../errors/createError.js');

const isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        return next((createError('No tienes permisos para acceder', 401)))
    }
}
const isAuthAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role === "admin"){
        next();
    } else {
        return next((createError('No tienes permisos para acceder', 401)))
    }
}

module.exports = isAuth;