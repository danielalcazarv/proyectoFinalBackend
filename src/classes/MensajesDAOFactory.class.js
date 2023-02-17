import { config } from '../config/config.js';
import MensajesDAOMongoDB from '../models/daos/MensajesMongoDB.dao.js';

class MensajesDAOFactory {
    static get() {
        
        switch (config.server.PERS){
            case 'MONGODB_ATLAS':
                return new MensajesDAOMongoDB();
            default:
                return new MensajesDAOMongoDB();
        }
    }
};

export default MensajesDAOFactory;