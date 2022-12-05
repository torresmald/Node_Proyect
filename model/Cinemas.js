//* COLECCION DE CINES EN LA QUE RECOGEMOS COMO MODELO LOS DATOS DE:
//? NOMBRE--> DEBE SER ÚNICO Y REQUERIDO.
//? LOCALIZACION--> DEBE SER REQUERIDA.
//? PELÍCULAS--> LISTADO DE PELÍCULAS QUE DISPONE ESE CINE. LO RECOGEMOS DE LA COLECCIÓN DE PELÍCULAS.
//? IMAGEN--> IMAGEN DEL CINE (OPCIONAL)

const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true},
        location: { type: String, required: true},
        movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
        picture: String
    },
    {
        timestamps: true
    });

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;