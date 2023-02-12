import {Router} from 'express';
import ProductosController from '../controllers/productos.controller.js';
import auth from '../middlewares/auth.middleware.js'
import mongoFailGetById from '../middlewares/productos.middleware.js';
const controlador = new ProductosController()

const routes = Router();

routes.get('/', controlador.obtenerProductos);
routes.get('/vista/:categoria',  controlador.obtenerCategorias)
routes.get('/ofertas',  controlador.obtenerOfertas);
routes.get('/detalle/:id', mongoFailGetById, controlador.obtenerProducto);
routes.post('/admin/guardar', controlador.guardarProducto);
routes.delete('/admin/borrar/:id', mongoFailGetById, controlador.borrarProducto);
routes.put('/admin/actualizar/:id', mongoFailGetById, controlador.actualizarProducto);

export default routes;