//* ARCHIVO DE CONEXION CON LA BBDD

const mongoose = require ('mongoose');
const DB_URL = "mongodb+srv://root:V20Ra6B05cfRUbsK@project.jpe1jb7.mongodb.net/?retryWrites=true&w=majority"

// const DB_URL = process.env.DB_URL;

const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connect;