import {Router} from 'express';
import OrdenesController from '../controllers/ordenes.controller.js';
import auth from '../middlewares/auth.middleware.js';
const controlador = new OrdenesController();

const routes = Router();

routes.get('/:pedido', auth, controlador.verOrdenDeUser);
routes.post('/', auth, controlador.guardarOrden);

export default routes;