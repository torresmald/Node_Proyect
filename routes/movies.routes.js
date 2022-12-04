const express = require('express');
const moviesRouter = express.Router();
const Movie = require('../model/Movies.js');
const createError = require('../utils/errors/createError.js');
const isAuth = require ('../utils/middlewares/auth.middleware.js');
const isAuthAdmin = require ('../utils/middlewares/auth.middleware.js');
const upload = require ('../utils/middlewares/files.middleware.js');
const uploadToCloud = require ('../utils/middlewares/cloudinary.middleware.js')

moviesRouter.get('/', [isAuth], async (request, response, next) => {
    try {
        const allMovies = await Movie.find();
        if (allMovies.length === 0) {
            next(createError('No hay películas disponibles', 404))
        }
        return response.status(200).json(allMovies);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/id/:id',[isAuth], async (request, response, next) => {
    try {
        const idMovie = request.params.id;
        const movie = await Movie.find({ _id: idMovie });
        if (movie.length === 0) {
            next(createError(`No hay ninguna película con el Id: ${idMovie}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/title/:title',[isAuth],  async (request, response, next) => {
    try {
        const titleMovie = request.params.title;
        const movie = await Movie.find({ title: titleMovie });
        if (movie.length === 0) {
            next(createError(`No hay ninguna película con el Título: ${titleMovie}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/genre/:genre',[isAuth],  async (request, response, next) => {
    try {
        const genreMovie = request.params.genre;
        const movie = await Movie.find({ genre: genreMovie });
        if (movie.length === 0) {
            next(createError(`No hay ninguna película con el Género: ${genreMovie}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.get('/year/:year',[isAuth],  async (request, response, next) => {
    try {
        const year = request.params.year;
        const movie = await Movie.find({ year: { $eq: year } });
        if (movie.length === 0) {
            next(createError(`No hay películas cuyo año sea posterior a ${year}`, 404))
        }
        return response.status(200).json(movie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.post('/',[isAuthAdmin, upload.single('picture'), uploadToCloud], async (request, response, next) => {
    try {
        const picture = request.file ? request.file.filename : null;
        const newMovie = new Movie({ ...request.body, picture: request.file_url});
        const newMovieDoc = await newMovie.save();
        return response.status(201).json(newMovieDoc);
    } catch (error) {
        next(error)
    }
});
moviesRouter.put('/:id',[isAuthAdmin], async (request, response, next) => {
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
            next(createError(`No se encuentra la película con el Id: ${id} para actualizarla`, 404))
        }
        return response.status(201).json(updatedMovie);
    } catch (error) {
        next(error)
    }
});
moviesRouter.delete('/:id',[isAuthAdmin], async (request, response, next) => {
    try {
        const id = request.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            next(createError(`No se encuentra la película con el Id: ${id} para eliminarla`, 404))
        } else {
            return response.status(200).json(`Película eliminada con éxito`);
        }
    } catch (error) {
        next(error)
    }
})
module.exports = moviesRouter;