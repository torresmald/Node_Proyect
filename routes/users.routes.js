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

userRouter.put('/addFavoriteMovie', [isAuthAdmin] ,async (request, response, next) => {
    try {
        const { userId, movieId } = request.body;
        const currentMovie = await Movie.findById(movieId);
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
// userRouter.put('/removeFavoriteMovie', [isAuthAdmin] ,async (request, response, next) => {
//     try {
//         const { userId, movieId } = request.body;
//         const currentMovie = await Movie.findById(movieId);
//         const userUpdated = await User.findByIdAndUpdate(
//             userId,
//             { $pull: { favoriteMovies: currentMovie } },
//             { new: true }
//         );
//         return response.status(201).json(userUpdated);
//     } catch (error) {
//         return next(error)
//     }
// });
userRouter.delete('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const userToDelete = await User.findByIdAndDelete(id);
        if (!userToDelete) {
            return next(createError(`No existe el usuario con Id: ${id}`))
        }
        response.status(200).json(`Usuario con Id: ${id} eliminado con éxito`);
    } catch (error) {
        return next(error)
    }
})

module.exports = userRouter;