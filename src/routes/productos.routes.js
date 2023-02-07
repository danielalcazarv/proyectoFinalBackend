import {Router} from 'express';
import ProductosController from '../controllers/productos.controller.js';
const controlador = new ProductosController()

const routerProductos = Router();

routerProductos.get('/', controlador.obtenerProductos);
routerProductos.get('/:id', controlador.obtenerProducto);
routerProductos.post('/', controlador.guardarProducto);
routerProductos.delete('/:id', controlador.borrarProducto);
routerProductos.put('/:id', controlador.actualizarProducto);

export default routerProductos;