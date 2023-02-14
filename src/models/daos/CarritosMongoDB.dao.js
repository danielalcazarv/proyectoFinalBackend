import ContenedorMongoDB from '../containers/ContenedorMongoDB.js';
import CarritosMongoDBModel from '../CarritosMongoDB.models.js';

class CarritosDAOMongoDB extends ContenedorMongoDB {
    constructor(){
        super(CarritosMongoDBModel);
    }
};

export default CarritosDAOMongoDB;