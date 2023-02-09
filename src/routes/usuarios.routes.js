import {Router} from 'express';
import UsuariosController from '../controllers/usuarios.controller.js';
const controlador = new UsuariosController()

const routes = Router();

routes.get('/', controlador.login);

export default routes;