import {Router} from 'express';
import MensajesController from '../controllers/mensajes.controller.js';
import auth from '../middlewares/auth.middleware.js'
const controlador = new MensajesController()

const routes = Router();

routes.get('/', auth, controlador.obtenerMensajes);

export default routes;
