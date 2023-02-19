import ContenedorMongoDB from '../containers/ContenedorMongoDB.js';
import OrdenesMongoDBModel from '../OrdenesMongoDB.models.js';

class OrdenesDAOMongoDB extends ContenedorMongoDB {
    constructor(){
        super(OrdenesMongoDBModel);
    }
};

export default OrdenesDAOMongoDB;