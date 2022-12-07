//* MIDDLEWARE EN EL QUE HAREMOS USO DE MULTER PARA LA SUBIDA DE ARCHIVOS AL SERVIDOR. 
//? SOLO PERMITIMOS LA SUBIDA DE ARCHIVOS DE IMAGEN CON EXTENSIONES PNG, JPG Y JPEG. DICHO ARCHIVO SE SUBIRÁ CON EL NOMBRE DE LA FECHA/HORA + NOMBREARCHIVO. 
//? LOS ARVHIVOS SE SUBIRAN A LA CARPETA TMP PARA POSTERIORMENTE SUBIRLOS AL HOST DE IMAGENES Y ELIMINARLO LOCALMENTE.

const multer = require ('multer');
const path = require ('path');
const createError = require ('../errors/createError.js')
const VALID_FILES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];


const fileFilter = (request, file, cb) => {
    if(!VALID_FILES.includes(file.mimetype)){
        cb(createError('El tipo de archivo no es válido'))
    } else {
        cb(null, true)
    }
};

const storage = multer.diskStorage({
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname )
    },
    destination: (request, file, cb) => {
        cb(null, '/tmp/')
    }
});

const upload = multer({storage, fileFilter});

module.exports = upload;