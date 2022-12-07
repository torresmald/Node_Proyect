//* CONJUNTO DE ENDPOINTS PARA LA COLECCIÓN DE PELÍCULAS:
//! ES NECESARIO ESTAR LOGUEADO PARA ACCEDER A CUALQUIER ENDPOINT.
//? ENDPOINTS GET PARA RECOGER TODAS LAS PELÍCULAS, DAMOS LA OPCIÓN DE TRAERLAS PAGINADAS. TAMBIEN TENEMOS LAS OPCIONES DE RECUPERAR UNA PELÍCULA POR ID, POR GENERO, POR TITULO Y POR AÑO.
//? ENDPOINTS POST PARA AÑADIR UNA NUEVA PELÍCULA.
//? ENDPOINTS PUT PARA MODIFICAR UNA PELÍCULA EXISTENTE.
//? ENDPOINTS DELETE PARA ELIMINAR UNA PELÍCULA. AL ELIMINAR LA PELÍCULA SE QUITARÁ DE LAS PELICULAS DISPONIBLES EN EL CINE CORRESPONDIENTE.

const express = require('express');
const moviesRouter = express.Router();
const Movie = require('../model/Movies.js');
const Cinema = require('../model/Cinemas.js');
const createError = require('../utils/errors/createError.js');
const isAuth = require('../utils/middlewares/auth.middleware.js');
const isAuthAdmin = require('../utils/middlewares/authAdmin.middleware.js');
const upload = require('../utils/middlewares/files.middleware.js');
const uploadToCloud = require('../utils/middlewares/cloudinary.middleware.js')

moviesRouter.get('/', [isAuth], async (request, response, next) => {
    try {
        const allMovies = await Movie.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
        if (allMovies.length === 0) {
            return next(createError('No hay películas disponibles', 404))
        }
        return response.status(200).json(allMovies);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/paged', [isAuth], async (request, response, next) => {
    try {
        let page = request.query.page;
        const startPage = (page - 1) * 5;
        const endPage = page * 5;
        const allMovies = await Movie.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
        if (allMovies.length === 0) {
            return next(createError('No hay películas disponibles', 404))
        }
        if (!page) {
            return next(createError('No se ha indicado un número de página valido', 404))
        }
        page = parseInt(page, 10);
        const pagedMovies = allMovies.slice(0, 5);
        const maxPage = Math.ceil(allMovies.length / 5);
        if (page <= 0 || (page - 1) * 5 > allMovies.length - 1) {
            return response.status(404).json(`La página no existe, la primera página es: 1 y la ultima pagina es : ${maxPage}`);
        }
        response.status(200).json({
            movies: allMovies.slice(startPage, endPage),
            nextPage: page + 1 <= maxPage ? page + 1 : null,
            previousPage: page - 1 < 1 ? null : page - 1
        });
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/id/:id', [isAuth], async (request, response, next) => {
    try {
        const idMovie = request.params.id;
        const movie = await Movie.find({ _id: idMovie }, { _id: 0, createdAt: 0, updatedAt: 0 });
        if (movie.length === 0) {
            return next(createError(`No hay ninguna película con el Id: ${idMovie}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/title/:title', [isAuth], async (request, response, next) => {
    try {
        const titleMovie = request.params.title;
        const movie = await Movie.find({ title: titleMovie });
        if (movie.length === 0) {
            return next(createError(`No hay ninguna película con el Título: ${titleMovie}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/genre/:genre', [isAuth], async (request, response, next) => {
    try {
        const genreMovie = request.params.genre;
        const movie = await Movie.find({ genre: genreMovie });
        if (movie.length === 0) {
            return next(createError(`No hay ninguna película con el Género: ${genreMovie}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/year/:year', [isAuth], async (request, response, next) => {
    try {
        const year = request.params.year;
        const movie = await Movie.find({year: {$gte: year}}, { favoriteCount: 0, genre: 0, _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort({year: 1});
        if (movie.length === 0) {
            return next(createError(`No hay películas cuyo año sea: ${year}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.post('/', [isAuthAdmin, upload.single('picture'), uploadToCloud], async (request, response, next) => {
    try {
        const picture = request.file ? request.file.filename : null;
        const newMovie = new Movie({ ...request.body, picture: request.file_url });
        const newMovieDoc = await newMovie.save();
        return response.status(201).json(newMovieDoc);
    } catch (error) {
        next(error)
    }
});
moviesRouter.put('/:id', [isAuthAdmin], async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedMovie = new Movie({ ...request.body });
        modifiedMovie._id = id;
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            modifiedMovie,
            { new: true }
        );
        if (!updatedMovie) {
            return next(createError(`No se encuentra la película con el Id: ${id} para actualizarla`, 404))
        }
        return response.status(201).json(updatedMovie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.delete('/:id', [isAuthAdmin], async (request, response, next) => {
    try {
        const id = request.params.id;
        const currentMovie = await Movie.findById(id);
        const cinemasHaveMovie = await Cinema.find({
            movies: { $in: id }
        });
        const deleteMovie = cinemasHaveMovie.forEach(async cinema => {
            const cinemaId = cinema._id;
            await Cinema.findByIdAndUpdate(
                cinemaId,
                { $pull: { movies: id } },
                { new: true }
            )
        });
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return next(createError(`No se encuentra la película con el Id: ${id} para eliminarla`, 404))
        } else {
            return response.status(200).json(`Película eliminada con éxito`);
        }
    } catch (error) {
        next(error)
    }
});


module.exports = moviesRouter;