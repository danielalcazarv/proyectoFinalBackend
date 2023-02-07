import ProductosDAOFactory from '../classes/ProductosDAOFactory.class.js';
import { logger } from '../utils/logger.js';

const DAO = ProductosDAOFactory.get();

class ProductosController {
    obtenerProductos = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            res.status(200).json(docs);
        }catch (error){
            logger.error(error);
        }
    };

    obtenerProducto = async (req, res) => {
        try {
            let doc = await DAO.listar(req.params.id)
            res.status(200).json(doc);
        }catch (error){
            logger.error(error);
        }
    };

    actualizarProducto = async (req, res) => {
        try {
            let id = req.params.id;
            let obj = req.body
            await DAO.actualizar(id, obj);
            res.status(201).json({msg:'Producto Actualizado', new:{...obj}});
        } catch (error){
            logger.error(error);
        }
    };

    guardarProducto = async (req, res) => {
        try{
            let obj = req.body
            console.log(req.body)
            console.log(obj)
            let doc = await DAO.guardar(obj);
            res.status(200).json({msg:'Producto Agregado', data: doc});
        }catch (error){
            logger.error(error);
        }
    };

    borrarProducto = async ( req, res) => {
        try{
            let id = req.params.id;
            await DAO.borrar(id);
            res.status(200).json({msg:'Producto Borrado'});
        }catch (error){
            logger.error(error);
        }
    };

    borrarProductos = async ( req, res) => {
        try{
            await DAO.borrarAll();
            res.status(200).json({msg:'Todos los Productos fueron Borrados'});
        } catch (error){
            logger.error(error);
        }
    };
};

export default ProductosController;