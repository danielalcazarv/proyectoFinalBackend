import {Router} from 'express';
import passport from '../services/passport.js';
import UsuariosController from '../controllers/usuarios.controller.js';
import logged from '../middlewares/logged.middleware.js'
const controlador = new UsuariosController()

const routes = Router();

routes.get('/', logged, controlador.login);
routes.post('/login', passport.authenticate('login', {failureRedirect:'/login-error', successRedirect:'/productos'}));
routes.get('/login-error', controlador.loginError);
routes.get('/registro', logged, controlador.registro);
routes.post('/registro', passport.authenticate('signup', {failureRedirect:'/registro-error', successRedirect:'/productos'}));
routes.get('/registro-error', controlador.registroError);
routes.get('/logout', controlador.logOut)
export default routes;