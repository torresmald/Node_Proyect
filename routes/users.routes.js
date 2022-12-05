//* CONJUNTO DE ENDPOINTS PARA LA COLECCIÓN DE PELÍCULAS:
//! ES NECESARIO ESTAR LOGUEADO COMO ADMIN PARA PODER ELIMINAR USUARIOS
//? ENDPOINTS GET PARA RECOGER UNA LISTA DE TODOS LOS USUARIOS EXISTENTES.
//? ENDPOINTS POST PARA REGISTRARSE COMO USUARIO Y HACER LOGIN
//? ENDPOINTS PUT PARA MODIFICAR UN USUARIO Y QUE PUEDA AÑADIR/QUITAR UNA PELÍCULA COMO FAVORITA A SU LISTADO.
//? ENDPOINTS DELETE PARA ELIMINAR UN USUARIO.

const express = require('express');
const passport = require('passport');
const Movie = require('../model/Movies');
const User = require('../model/Users');
const userRouter = express.Router();
const createError = require('../utils/errors/createError.js');
const isAuthAdmin = require('../utils/middlewares/auth.middleware');

userRouter.get('/', async (request, response, next) => {
    try {
        const allUsers = await User.find().populate('favoriteMovies');
        if (allUsers.length === 0) {
            return response.status(200).json('No hay usuarios registrados');
        }
        return response.status(200).json(allUsers)
    } catch (error) {
        return next(error)
    }

})

userRouter.post('/register', async (request, response, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }
        request.logIn(
            user,
            (error) => {
                if (error) {
                    return next(error)
                }
                return response.status(200).json(user)
            }
        )
    }
    passport.authenticate('register', done)(request);
});

userRouter.post('/login', async (request, response, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }
        request.logIn(
            user,
            (error) => {
                if (error) {
                    return next(error);
                }
                return response.status(200).json(user);
            }
        )
    }
    passport.authenticate('login', done)(request);
});

userRouter.post('/logout', async (request, response, next) => {
    if (request.user) {
        request.logOut(() => {
            request.session.destroy(() => {
                response.clearCookie('connect.sid');
                response.status(200).json('Te has deslogueado con éxito')
            })
        })
    } else {
        return response.status(304).json('No hay usuario logueado')
    }
});
userRouter.put('/editUser/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedUser = new User({ ...request.body });
        modifiedUser._id = id;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            modifiedUser,
            { new: true }
        );
        if (!updatedUser) {
            return next(createError(`No se encuentra el usuario con el Id: ${id} para actualizarlo`, 404))
        }
        return response.status(201).json(updatedUser);
    } catch (error) {
        return next(error)
    }
});

userRouter.put('/addFavoriteMovie', async (request, response, next) => {
    try {
        debugger;
        const { userId, movieId } = request.body;
        const currentMovie = await Movie.findById(movieId);
        const currentFavoriteCount = currentMovie.favoriteCount;
        const favoriteUpdated = await Movie.findByIdAndUpdate(
            movieId,
            { $set: { favoriteCount: currentFavoriteCount + 1 } },
            { new: true }
        );
        const userUpdated = await User.findByIdAndUpdate(
            userId,
            { $push: { favoriteMovies: currentMovie } },
            { new: true }
        );
        return response.status(201).json(userUpdated);
    } catch (error) {
        return next(error)
    }
});
userRouter.put('/removeFavoriteMovie', async (request, response, next) => {
    try {
        debugger
        const { userId, movieId } = request.body;
        const currentMovie = await Movie.findById(movieId);
        const userUpdated = await User.findByIdAndUpdate(
            userId,
            { $pull: { favoriteMovies: movieId } },
            { new: true }
        );
        return response.status(201).json(userUpdated);
    } catch (error) {
        return next(error)
    }
});
userRouter.delete('/:id', async (request, response, next) => {
    try {

        const id = request.params.id;
        const currentUser = await User.findById(id);
        const currentFavoriteMovies = currentUser.favoriteMovies;
        const updatedFavoriteMovies = currentFavoriteMovies.forEach(async movie => {
            currentMovie = await Movie.findById(movie._id);
            currentFavoriteCount = currentMovie.favoriteCount;
            await Movie.findByIdAndUpdate(
                movie._id,
                { $set: { favoriteCount: currentFavoriteCount - 1 } },
                { new: true }
            )
        });
        if (!currentUser) {
            return next(createError(`No existe el usuario con Id: ${id}`))
        }
        const deletedUser = await User.findByIdAndDelete(id);
        response.status(200).json(`Usuario con Id: ${id} eliminado con éxito`);
    } catch (error) {
        return next(error)
    }
})

module.exports = userRouter;