const express = require('express');
const moviesTheaterRouter = express.Router();
const Theater = require('../model/Movies_Theater.js');
const createError = require('../utils/errors/createError.js');

moviesTheaterRouter.get('/', async (request, response, next) => {
    try {
        const allTheater = await Theater.find();
        if (allTheater.length === 0) {
            next(createError('No hay salas disponibles', 404))
        }
        return response.status(200).json(allTheater);
    } catch (error) {
        next(error)
    }
});


