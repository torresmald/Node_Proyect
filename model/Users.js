//* COLECCION DE USUARIOS EN LA QUE RECOGEMOS COMO MODELO LOS DATOS DE:
//? NOMBRE USUARIO --> DEBE SER ÚNICO Y REQUERIDO. ADEMÁS DEBE CUMPLIR UNOS REQUISITOS DE LONGITUD DE CARACTERES.
//? EMAIL--> OPCIONAL. DEBE CUMPLIR UNOS REQUISITOS DE VALIDACION.
//? CONTRASEÑA--> DEBE SER REQUERIDA.
//? ROL--> LISTADO DE GRADOS DE ACCESO PARA LA AUTENTICACION. 
//? LISTADO PELÍCULAS FAVORITAS--> LO RECOGEMOS DE LA COLECCION DE PELÍCULAS.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 4, maxlength: 15 },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"] },
    favoriteMovies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }]
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;