import CarritosDaoFactory from '../classes/CarritosDAOFactory.class.js';
import ProductosDAOFactory from '../classes/ProductosDAOFactory.class.js';
import CarritoDTO from '../dtos/CarritoDTO.class.js';
import { logger } from '../utils/logger.js';

const DAOCarritos = CarritosDaoFactory.get();
const DAOProductos = ProductosDAOFactory.get();

class CarritosController{
    verCarrito = async (req, res) => {
        try {
            const user = req.user;
            let carts = await DAOCarritos.listarAll();
            const carrito = CarritoDTO.getCarritoDeUser(carts, user);
            if(carrito){
                const productsCart = carrito;
                logger.info(`Vista del carrito de ${user.username}.`)
                res.render('carrito', {productsCart}); 
            }else{
                const newCart = await DAOCarritos.guardar({username: user.username, productos:[]})
                logger.info(`Carrito de ${user.username} creado con éxito!`)
                res.render('carrito', {newCart});
            }
        }catch (error){
            logger.error(error);
        }
    };

    addProdCarrito = async (req, res) => {
        try {
            const user = req.user;
            const {id, cantidad} = req.query;
            const prodSelected = {id, cantidad};
            const carts = await DAOCarritos.listarAll();
            const getProd = await DAOProductos.listar(prodSelected.id);
            const newProd = {producto: getProd, cantidad: parseInt(prodSelected.cantidad)};
            let carrito = CarritoDTO.getCarritoDeUser(carts, user);
            if (carrito){
                CarritoDTO.prodRepetido(newProd, carrito);
                await DAOCarritos.actualizar(carrito.id, carrito);
                logger.info(`Se agrega producto al carrito de ${user.username}.`);
                res.redirect('/carrito');
            }else{
                await DAOCarritos.guardar({username: user.username, productos:[newProd]})
                logger.info(`Carrito de ${user.username} creado con éxito!`);
                logger.info(`Se agrega producto al carrito de ${user.username}.`);
                res.redirect('/carrito');
            }
        } catch (error) {
            logger.error(error);
        }
    };

    delProdCarrito = async (req, res) => {
        try {
            const user = req.user;
            const {id} = req.body;
            const carts = await DAOCarritos.listarAll();
            let carrito = CarritoDTO.getCarritoDeUser(carts, user);
            CarritoDTO.eliminarProducto(carrito, id);
            await DAOCarritos.actualizar(carrito.id, carrito);
            logger.info(`Se elimina producto del carrito de ${user.username}.`);
            res.redirect('/carrito');
        } catch (error) {
            logger.error(error);
        }
    };

    vaciarCarrito = async (req, res) => {
        try {
            const user = req.user;
            const carts = await DAOCarritos.listarAll();
            let carrito = CarritoDTO.getCarritoDeUser(carts, user);
            const carritoVacio = CarritoDTO.desdeCarritoDAO({id: carrito.id, timestamp: carrito.timestamp, productos:[]},user);
            await DAOCarritos.actualizar(carrito.id, carritoVacio);
            res.redirect('/carrito');
        } catch (error) {
            logger.error(error);
        }
    };
};

export default CarritosController;