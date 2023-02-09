import ContenedorMongoDB from '../containers/ContenedorMongoDB.js';
import UsuariosMongoDBModel from '../UsuariosMongoDB.models.js';

class UsuariosDAOMongoDB extends ContenedorMongoDB {
    constructor(){
        super( UsuariosMongoDBModel);
    }
};

export default UsuariosDAOMongoDB;