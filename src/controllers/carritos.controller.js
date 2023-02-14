import CarritosDaoFactory from '../classes/CarritosDAOFactory.class.js';
import CarritoDTO from '../dtos/CarritoDTO.class.js';
import { logger } from '../utils/logger.js';

const DAOCarritos = CarritosDaoFactory.get();

class CarritosController{
    verCarrito = async (req, res) => {
        try {
            const user = req.user;
            let docs = await DAOCarritos.listarAll();
            const carrito = CarritoDTO.getCarritoDeUser(docs, user);
            if(carrito){
                logger.info(`Vista del carrito de ${user.username}.`)
                res.status(200).json({msg:carrito}); //cambiar con la ruta render correspondiente y los objetos necesarios
            }else{
                const newCart = await DAOCarritos.guardar({username: user.username, productos:[]})
                logger.info(`Carrito de ${user.username} creado con éxito!`)
                res.status(200).json({msg:newCart}); //cambiar con la ruta render correspondiente y los objetos necesarios
            }
        }catch (error){
            logger.error(error);
        }
    };

};

export default CarritosController;