import {Router} from 'express';
import ProductosController from '../controllers/productos.controller.js';
const controlador = new ProductosController()

const routes = Router();

routes.get('/', controlador.obtenerProductos);
routes.get('/:id', controlador.obtenerProducto);
routes.post('/', controlador.guardarProducto);
routes.delete('/:id', controlador.borrarProducto);
routes.put('/:id', controlador.actualizarProducto);

export default routes;