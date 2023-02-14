import express from "express"
const { Router } = express;
const routes = Router();

/*++++++++++ Rutas ++++++++++ */
import productos from './productos.routes.js'
import usuarios from './usuarios.routes.js'
import carritos from './carritos.routes.js'

//Configuración de Rutas
routes.use('/', usuarios)
routes.use('/productos', productos);
routes.use('/carrito', carritos);
export default routes;