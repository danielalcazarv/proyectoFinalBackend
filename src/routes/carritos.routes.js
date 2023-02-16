import {Router} from 'express';
import CarritosController from '../controllers/carritos.controller.js';
import auth from '../middlewares/auth.middleware.js'
const controlador = new CarritosController();

const routes = Router();

routes.get('/', auth, controlador.verCarrito);
routes.get('/add', auth, controlador.addProdCarrito);
routes.post('/', auth, controlador.delProdCarrito);
routes.post('/vaciar', auth, controlador.vaciarCarrito);


export default routes;