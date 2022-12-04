const multer = require ('multer');
const path = require ('path');
const createError = require ('../errors/createError.js')
const VALID_FILES = ['image/png', 'image/jpg', 'image/jpeg'];


const fileFilter = (req, file, cb) => {
    if(!VALID_FILES.includes(file.mimetype)){
        cb(createError('El tipo de archivo no es válido'))
    } else {
        cb(null, true)
    }
};

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname )
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'))
    }
});

const upload = multer({storage, fileFilter});

module.exports = upload;