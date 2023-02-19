import { config } from '../config/config.js';
import OrdenesDAOMongoDB from '../models/daos/OrdenesMongoDB.dao.js';

class OrdenesDAOFactory {
    static get() {

        switch (config.server.PERS){
            case 'MONGODB_ATLAS':
                return new OrdenesDAOMongoDB();
            default:
                return new OrdenesDAOMongoDB();
        }
    }
};

export default OrdenesDAOFactory;