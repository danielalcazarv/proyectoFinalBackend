import UsuariosDAOFactory from '../classes/UsuariosDAOFactory.class.js';
import { logger } from '../utils/logger.js';

const DAO = UsuariosDAOFactory.get();


///NO ME CASO CON ESTE ESQUEMA TENGO QUE INVENTAR UN CONTROLADOR QUE ME SIRVA YO CONSUMO DATOS DEL DAO NADA MÁS
class UsuariosController {
    login = async (req, res) => {
        res.render('login');
    }

    /*
    obtenerUsuarios = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            res.status(200).json(docs);
        }catch (error){
            logger.error(error);
        }
    };

    obtenerUsuario = async (req, res) => {
        try {
            let doc = await DAO.listar(req.params.id)
            res.status(200).json(doc);
        }catch (error){
            logger.error(error);
        }
    };

    actualizarUsuario = async (req, res) => {
        try {
            let id = req.params.id;
            let obj = req.body
            await DAO.actualizar(id, obj);
            res.status(201).json({msg:'Perfil de Usuario Actualizado', new:{...obj}});
        } catch (error){
            logger.error(error);
        }
    };

    guardarUsuario = async (req, res) => {
        try{
            let obj = req.body
            let doc = await DAO.guardar(obj);
            res.status(200).json({msg:'Usuario creado', data: doc});
        }catch (error){
            logger.error(error);
        }
    };

    borrarUsuario = async ( req, res) => {
        try{
            let id = req.params.id;
            await DAO.borrar(id);
            res.status(200).json({msg:'Perfil de Usuario Borrado'});
        }catch (error){
            logger.error(error);
        }
    };

    borrarUsuarios = async ( req, res) => {
        try{
            await DAO.borrarAll();
            res.status(200).json({msg:'Todos los Usuarios fueron Borrados'});
        } catch (error){
            logger.error(error);
        }
    };*/
};

export default UsuariosController;