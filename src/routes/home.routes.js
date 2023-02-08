import {Router} from 'express';
import HomeController from '../controllers/home.controller.js';
const controlador = new HomeController()

const routes = Router();

routes.get('/', controlador.obtenerOfertas);

export default routes;