import { config } from '../config/config.js';
import ProductosDAOMongoDB from '../models/daos/ProductosMongoDB.dao.js';

class ProductosDAOFactory {
    static get() {
        
        switch (config.server.PERS){
            case 'MONGODB_ATLAS':
                return new ProductosDAOMongoDB();
            default:
                return new ProductosDAOMongoDB();
        }
    }
};

export default ProductosDAOFactory;