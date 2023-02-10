import {Router} from 'express';
import passport from '../services/passport.js';
import UsuariosController from '../controllers/usuarios.controller.js';
const controlador = new UsuariosController()

const routes = Router();

routes.get('/', controlador.login);
routes.post('/login', passport.authenticate('login', {failureRedirect:'/login-error', successRedirect:'/productos/ofertas'}));//modificar rutas  y safe
routes.get('/login-error', controlador.loginError);
routes.get('/registro', controlador.registro);
routes.post('/registro', passport.authenticate('signup', {failureRedirect:'/registro-error', successRedirect:'/productos/ofertas'}));
routes.get('/registro-error', controlador.registroError);
export default routes;