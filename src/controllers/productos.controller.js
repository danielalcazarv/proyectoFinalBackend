import ProductosDAOFactory from '../classes/ProductosDAOFactory.class.js';
import ProductosDestacadosDTO from '../dtos/ProductosDestacadosDTO.class.js';
import ProductosCategoriaDTO from '../dtos/ProductosCategoriaDTO.class.js';
import { logger } from '../utils/logger.js';

const DAO = ProductosDAOFactory.get();

class ProductosController {
    obtenerProductos = async (req, res) => {
        try {
            let destacados = await DAO.listarAll();
            res.render('home', {destacados} )
        }catch (error){
            logger.error(error);
        }
    };

    obtenerProducto = async (req, res) => {
        try {
            let doc = await DAO.listar(req.params.id)
            res.render('detalle-producto', {doc} )
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

    obtenerOfertas = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            let destacados = ProductosDestacadosDTO.filtrarOfertas(docs);
            res.render('home', {destacados, ofertas:true} )
        }catch (error){
            logger.error(error);
        }
    };

    obtenerCategorias = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            let category = req.params.categoria;
            let categoryUpperCase = category.toString().toUpperCase()
            let destacados = ProductosCategoriaDTO.filtrarCategoria(docs, categoryUpperCase);
            res.render('home', {destacados, categoryUpperCase} )
        }catch (error){
            logger.error(error);
        }
    };
};

export default ProductosController;