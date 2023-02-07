import { config } from '../config/config.js';
import ProductosDAOMongoDB from '../models/daos/ProductosMongoDB.dao.js';
import { logger } from '../utils/logger.js';

class ProductosDAOFactory {
    static get() {
        logger.info(`Persistencia: ${config.server.PERS}`);

        switch (config.server.PERS){
            case 'MONGODB_ATLAS':
                return new ProductosDAOMongoDB();
            default:
                return new ProductosDAOMongoDB();
        }
    }
};

export default ProductosDAOFactory;