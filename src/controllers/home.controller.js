import ProductosDAOFactory from '../classes/ProductosDAOFactory.class.js';
import ProductosDestacadosDTO from '../dtos/ProductosDestacadosDTO.class.js';
import { logger } from '../utils/logger.js';

const DAO = ProductosDAOFactory.get();

class HomeController {
    obtenerOfertas = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            let destacados = ProductosDestacadosDTO.filtrarOfertas(docs);
            res.render('home', {destacados} )
        }catch (error){
            logger.error(error);
        }
    };
};

export default HomeController;