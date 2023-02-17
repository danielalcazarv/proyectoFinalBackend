import { emailUsuarioNuevo } from "../services/nodemailer.js";
import { logger } from "../utils/logger.js";

const noShow = true

class UsuariosController {
    login = async (req, res) => {
        try {
            res.render('login', {noShow});
        } catch (error) {
            logger.error(error);
        }
    };

    loginError = async (req,res) => {
        try {
            res.render('login-error', {noShow});
        } catch (error) {
            logger.error(error);
        }
    };

    registro = async (req,res) => {
        try {
            res.render('registro', {noShow});
        } catch (error) {
            logger.error(error);
        }
    };

    postRegistro = async (req, res) => {
        try {
            const user = req.user;
            emailUsuarioNuevo(user);
            res.redirect('/productos');
        } catch (error) {
            logger.error(error);
        }
    };

    registroError = async (req,res) => {
        try {
            res.render('registro-error', {noShow});
        } catch (error) {
            logger.error(error);
        }
    };

    logOut = async (req,res) => {
        const user = req.user;
        req.logOut(err => {
        const noShow = true
        res.render('logout', {user, noShow});
        })
    };

    perfil = async (req, res) => {
        try {
            const user = req.user;
            res.render('perfil', {user});
        } catch (error) {
            logger.error(error);
        }
    };
};

export default UsuariosController;