import {Router} from 'express';
import ProductosController from '../controllers/productos.controller.js';
import auth from '../middlewares/auth.middleware.js'
import mongoFailGetById from '../middlewares/mongoIdFail.middleware.js';
const controlador = new ProductosController()

const routes = Router();

routes.get('/', auth, controlador.obtenerProductos);
routes.get('/vista/:categoria', auth,  controlador.obtenerCategorias)
routes.get('/ofertas', auth, controlador.obtenerOfertas);
routes.get('/detalle/:id', auth, mongoFailGetById, controlador.obtenerProducto);
routes.post('/admin/guardar', auth, controlador.guardarProducto);
routes.delete('/admin/borrar/:id', auth, mongoFailGetById, controlador.borrarProducto);
routes.put('/admin/actualizar/:id', auth,  mongoFailGetById, controlador.actualizarProducto);

export default routes;