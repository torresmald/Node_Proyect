//* FUNCION QUE NOS PERMITE LA GENERACION DE ERRORES PARA SU CONTROLACIÓN EN LOS ENDPOINT/MIDDLEWARES.

const createError = (message, status) => {
    const newError = new Error (message);
    newError.status = status;
    return newError
};

module.exports = createError;