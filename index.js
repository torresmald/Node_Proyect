require('dotenv').config();

const express = require('express');
const connect = require('./utils/db/connect.js');
const cors = require('cors');
const createError = require('./utils/errors/createError.js');
const server = express();
const moviesRouter = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinemas.routes.js');
const userRouter = require('./routes/users.routes.js');
const theaterRouter = require('./routes/theater.routes.js')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const path = require('path');
const cloudinary = require('cloudinary');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'https://node-proyect.vercel.app'
      }
    ]
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`],
}





connect();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '/tmp/')));

server.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerSpec)));

require('./utils/authentication/passport.js');
server.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7200000
  },
  store: MongoStore.create({
    mongoUrl: DB_URL
  })
}));
server.use(passport.initialize());
server.use(passport.session());

server.get('/', (request, response) => {
  response.status(200).json('Bienvenido a la Coleccion de Películas, Cines y Salas de Cine.')
})
server.use('/users', userRouter);
server.use('/theaters', theaterRouter)
server.use('/movies', moviesRouter);
server.use('/cinemas', cinemasRouter);
server.use('*', (request, response, next) => {
  next(createError(`Esta ruta no existe`, 404))
});

server.use((error, request, response, next) => {
  return response.status(error.status || 500).json(error.message || 'Unexpected Error')
});
server.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});

module.exports = server;