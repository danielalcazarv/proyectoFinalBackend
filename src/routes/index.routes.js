import express from "express"
const { Router } = express;
const routes = Router();

/*++++++++++ Rutas ++++++++++ */
import productos from './productos.routes.js'
import usuarios from './usuarios.routes.js'

//Configuración de Rutas
routes.use('/', usuarios)
routes.use('/productos', productos);
export default routes;