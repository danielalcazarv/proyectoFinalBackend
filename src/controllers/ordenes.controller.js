import OrdenesDAOFactory from '../classes/OrdenesDAOFactory.class.js';
import CarritosDAOFactory from '../classes/CarritosDAOFactory.class.js';
import CarritoDTO from '../dtos/CarritoDTO.class.js';
import OrdenDTO from '../dtos/OrdenDTO.class.js';
import { logger } from '../utils/logger.js';

const DAOOrdenes = OrdenesDAOFactory.get();
const DAOCarritos = CarritosDAOFactory.get();

class OrdenesController {
    verOrdenDeUser = async (req, res) => {
        try {
            const user = req.user;
            const pedido = req.params.pedido;
            const ordenes = await DAOOrdenes.listarAll();
            const orden = OrdenDTO.filtrarOrden(ordenes, pedido);
            res.render('orden', {orden, user});
        } catch (error) {
            logger.error(error);
        }
    };

    guardarOrden = async (req, res) => {
        try {
            const user = req.user;
            const carts = await DAOCarritos.listarAll();
            const carrito = CarritoDTO.getCarritoDeUser(carts, user);
            const ordenes = await DAOOrdenes.listarAll();
            const carritoTotales = CarritoDTO.cacularTotales(carrito);
            if (carritoTotales){
                const pedido = OrdenDTO.pedidoDesdeOrdenDAO(ordenes)
                const orden = OrdenDTO.desdeCarritoDAO(carritoTotales, user, pedido);
                const carritoVacio = CarritoDTO.desdeCarritoDAO({id: carrito.id, timestamp: carrito.timestamp, productos:[]},user);
                await DAOOrdenes.guardar(orden);
                await DAOCarritos.actualizar(carrito.id, carritoVacio);
                logger.info(`Orden generada Nro de pedido: ${orden.pedido}.`)
                res.render('orden', {orden, user});
            }else{
                res.render('orden', {fail:true});
            }
        } catch (error) {
            logger.error(error);
        }
    }
};

export default OrdenesController;