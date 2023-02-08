import ContenedorMongoDB from '../containers/ContenedorMongoDB.js';
import ProductosMongoDBModel from '../ProductosMongoDB.models.js';

class ProductosDAOMongoDB extends ContenedorMongoDB {
    constructor(){
        super( ProductosMongoDBModel);
    }
};

export default ProductosDAOMongoDB;