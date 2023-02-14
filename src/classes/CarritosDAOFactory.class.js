import { config } from '../config/config.js';
import CarritosDAOMongoDB from '../models/daos/CarritosMongoDB.dao.js';

class CarritosDAOFactory {
    static get() {

        switch (config.server.PERS){
            case 'MONGODB_ATLAS':
                return new CarritosDAOMongoDB();
            default:
                return new CarritosDAOMongoDB();
        }
    }
};

export default CarritosDAOFactory;