//* COLECCION DE PELÍCULASE EN LA QUE RECOGEMOS COMO MODELO LOS DATOS DE:
//? TÍTULO --> DEBE SER ÚNICO Y REQUERIDO.
//? DIRECTOR--> DEBE SER REQUERIDO.
//? AÑO LANZAMIENTO--> DEBE SER REQUERIDO Y ESTAR COMPRENDIDO EN UN RANGO DE FECHAS.
//? GÉNERO--> LISTADO DE GÉNEROS DISPONIBLES DE PELÍCULAS. 
//? IMAGEN--> OPCIONAL

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true},
        director: { type: String, required: true },
        year: { type: Number, min: 1895, max: 2023, required: true },
        genre: { type: [String], required: true, enum: ['Action', 'Adventure', 'Animated', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Historical', 'Horror', 'Noir', 'Science-fiction', 'Thriller', 'War', 'Western'] },
        picture: String,
        favoriteCount : Number
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;