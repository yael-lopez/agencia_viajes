import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error));

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next)=> {
    res.locals.year = new Date().getFullYear();
    res.locals.nombreSitio = "Agencia de viajes";

    return next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);

/** Puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${port} y host ${host}`);
})