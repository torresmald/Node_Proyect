//* COLECCION DE SALAS DE CINE EN LA QUE RECOGEMOS COMO MODELO LOS DATOS DE:
//? NUMERO DE SALA--> DEBE SER ÚNICO Y REQUERIDO.
//? Nº FILAS--> DEBE SER REQUERIDA.
//? Nº ASIENTOS--> DEBE SER REQUERIDA.
//? NOMBRE CINE--> NOMBRE DEL CINE EN EL QUE ESTÁ ESA SALA. LO RECOGEMOS DE LA COLECCIÓN DE CINES.
//? PELÍCULAS--> LISTADO DE PELÍCULAS QUE SE PROYECTAN EN ESA SALA. LO RECOGEMOS DE LA COLECCION DE PELÍCULAS.

const mongoose = require('mongoose');

const moviesTheaterSchema = new mongoose.Schema(
    {
        number: {type: Number, unique: true, required: true},
        rows: { type: Number, required: true },
        seats: { type: Number, required: true },
        cinema: [{ type: mongoose.Types.ObjectId, ref: 'Cinema'}],
        movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie'}]
    },
    {
        timestamps: true
    });

const Theater = mongoose.model('Movie Theater', moviesTheaterSchema);

module.exports = Theater;