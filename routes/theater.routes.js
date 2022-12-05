//* CONJUNTO DE ENDPOINTS PARA LA COLECCIÓN DE SALAS:
//! ES NECESARIO ESTAR LOGUEADO COMO PARA PODER ACCEDER A LOS ENDPOINTS
//? ENDPOINTS GET PARA RECOGER UNA LISTA DE TODAS LAS SALAS EXISTENTES.
//? ENDPOINTS POST PARA AÑADIR UNA SALA DE CINE.
//? ENDPOINTS PUT PARA MODIFICAR UNA SALA EXISTENTE.
//? ENDPOINTS DELETE PARA ELIMINAR UNA SALA DE CINE.

const express = require('express');
const theaterRouter = express.Router();
const Theater = require('../model/Movies_Theater.js');
const createError = require('../utils/errors/createError.js');
const isAuthAdmin = require ('../utils/middlewares/auth.middleware');

theaterRouter.get('/', async (request, response, next) => {
    try {
        const allTheater = await Theater.find().populate('movies').populate('cinema');
        if (allTheater.length === 0) {
            return next(createError('No hay salas disponibles', 404))
        }
        return response.status(200).json(allTheater);
    } catch (error) {
        next(error)
    }
});
theaterRouter.post('/', [isAuthAdmin] ,async (request, response, next) => {
    try{
        const newTheater = new Theater({...request.body});
        const newTheaterDoc = await newTheater.save();
        return response.status(201).json(newTheaterDoc);
    } catch(error){
        return next(error)
    }
});
theaterRouter.put('/:id',  [isAuthAdmin] ,async (request, response, next) => {
    try{
        const id = request.params.id;
        const modifiedTheater = new Theater({ ...request.body });
        modifiedTheater._id = id;
        const theaterUpdated = await Theater.findByIdAndUpdate(
            id,
            modifiedTheater,
            {new:true}
        )
        return response.status(201).json(theaterUpdated);
    } catch(error){
        return next(error)
    }
});
theaterRouter.delete('/:id', [isAuthAdmin], async (request, response, next) => {
    try{
        const id = request.params.id;
        const theaterDeleted = await Theater.findByIdAndDelete(id);
        return response.status(201).json('Sala eliminada con éxito')
    } catch(error){
        return next(error)
    }
})

module.exports = theaterRouter;


