import ContenedorMongoDB from '../containers/ContenedorMongoDB.js';
import MensajesMongoDBModel from '../MensajesMongoDB.models.js';

class MensajesDAOMongoDB extends ContenedorMongoDB {
    constructor(){
        super( MensajesMongoDBModel);
    }
};

export default MensajesDAOMongoDB;