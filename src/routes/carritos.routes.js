import {Router} from 'express';
import CarritosController from '../controllers/carritos.controller.js';
import auth from '../middlewares/auth.middleware.js'
import admin from '../middlewares/admin.middleware.js'
import mongoFailGetById from '../middlewares/mongoIdFail.middleware.js';
const controlador = new CarritosController();

const routes = Router();

routes.get('/', auth, controlador.verCarrito);
routes.get('/add', auth, controlador.addProdCarrito);



export default routes;