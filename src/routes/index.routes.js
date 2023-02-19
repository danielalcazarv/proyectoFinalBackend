import express from "express";
const { Router } = express;
const routes = Router();

/*++++++++++ Rutas ++++++++++ */
import productos from './productos.routes.js';
import usuarios from './usuarios.routes.js';
import carritos from './carritos.routes.js';
import mensajes from './mensajes.routes.js';
import ordenes from './ordenes.routes.js';

//Configuración de Rutas
routes.use('/', usuarios)
routes.use('/productos', productos);
routes.use('/carrito', carritos);
routes.use('/chat', mensajes);
routes.use('/orden', ordenes);

export default routes;