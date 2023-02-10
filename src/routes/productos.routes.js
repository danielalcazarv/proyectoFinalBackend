import {Router} from 'express';
import ProductosController from '../controllers/productos.controller.js';
import auth from '../middlewares/auth.middleware.js'
const controlador = new ProductosController()

const routes = Router();

routes.get('/', controlador.obtenerProductos);
routes.get('/ofertas', auth, controlador.obtenerOfertas);//hay que rehacer esto para que ocupe la forma de categorías
routes.get('/:id', controlador.obtenerProducto);
routes.post('/', controlador.guardarProducto);
routes.delete('/:id', controlador.borrarProducto);
routes.put('/:id', controlador.actualizarProducto);

export default routes;