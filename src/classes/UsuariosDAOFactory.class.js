import { config } from '../config/config.js';
import UsuariosDAOMongoDB from '../models/daos/UsuariosMongoDB.dao.js';

class UsuariosDAOFactory {
    static get() {

        switch (config.server.PERS){
            case 'MONGODB_ATLAS':
                return new UsuariosDAOMongoDB();
            default:
                return new UsuariosDAOMongoDB();
        }
    }
};

export default UsuariosDAOFactory;