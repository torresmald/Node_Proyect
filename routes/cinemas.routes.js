//* CONJUNTO DE ENDPOINTS PARA LA COLECCIÓN DE CINES:
//! ES NECESARIO ESTAR LOGUEADO PARA ACCEDER A CUALQUIER ENDPOINT.
//? ENDPOINTS GET PARA RECOGER TODOS LOS CINES, CINES QUE CONTENGAN UNA PELÍCULA.
//? ENDPOINTS POST PARA AÑADIR UN NUEVO CINE.
//? ENDPOINTS PUT PARA MODIFICAR UN CINE EXISTENTE.
//? ENDPOINTS DELETE PARA ELIMINAR UN CINE.


const express = require('express');
const cinemasRouter = express.Router();
const Cinema = require('../model/Cinemas.js');
const createError = require('../utils/errors/createError.js');
const isAuth = require('../utils/middlewares/auth.middleware.js');
const isAuthAdmin = require('../utils/middlewares/authAdmin.middleware.js');
const upload = require('../utils/middlewares/files.middleware');
const uploadToCloud = require('../utils/middlewares/cloudinary.middleware');

cinemasRouter.get('/', [isAuth], async (request, response, next) => {
    try {
        const allCinemas = await Cinema.find().populate('movies');
        if (allCinemas.length === 0) {
            return next(createError(`No hay ningún cine disponible`, 404))
        }
        return response.status(200).json(allCinemas)
    } catch (error) {
        next(error)
    }
});
cinemasRouter.get('/movie/:movie', [isAuth], async (request, response, next) => {
    try {
        const movie = request.params.movie;
        const allCinemas = await Cinema.find({ movies: movie }).populate('movies');
        if (allCinemas.length === 0) {
            return next(createError(`No hay cines disponibles con la película requerida: ${movie}`, 404))
        }
        return response.status(200).json(allCinemas)
    } catch (error) {
        next(error)
    }
});
cinemasRouter.post('/', [isAuthAdmin, upload.single('picture'), uploadToCloud], async (request, response, next) => {
    try {
        const newCinema = new Cinema({ ...request.body, picture: request.file_url });
        const newCinemaDoc = await newCinema.save();
        if (newCinemaDoc.length === 0) {
            return next(createError(`Error al crear el cine`, 404))
        }
        return response.status(200).json(newCinemaDoc)
    } catch (error) {
        next(error)
    }
});
cinemasRouter.put('/:id', [isAuthAdmin], async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedCinema = new Cinema({ ...request.body });
        modifiedCinema._id = id;
        const updatedCinema = await Cinema.findByIdAndUpdate(
            id,
            modifiedCinema,
            { new: true }
        )
        if (!updatedCinema) {
            return next(createError(`Error al modificar el cine con el Id: ${id}`, 404))
        }
        return response.status(200).json(updatedCinema)
    } catch (error) {
        next(error)
    }
});
cinemasRouter.delete('/:id', [isAuthAdmin], async (request, response, next) => {
    try {
        const id = request.params.id;
        const deletedCinema = await Cinema.findByIdAndDelete(id);
        if (!deletedCinema) {
            return next(createError(`No hay ningun Cine con la Id: ${id} para eliminarlo`, 404))
        } else {
            return response.status(200).json('Cine borrado con éxito');
        }
    } catch (error) {
        next(error)
    }
});


module.exports = cinemasRouter;