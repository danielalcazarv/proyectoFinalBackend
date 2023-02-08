import express from "express"
const { Router } = express;
const routes = Router();

/*++++++++++ Rutas ++++++++++ */
import home from './home.routes.js'
import productos from './productos.routes.js'

//Configuración de Rutas
routes.use('/', home);
routes.use('/api/productos/', productos);

export default routes;