import ContenedorMongoDB from '../containers/ContenedorMongoDB.js';
import ProductosModel from '../Productos.models.js';

class ProductosDAOMongoDB extends ContenedorMongoDB {
    constructor(){
        super( ProductosModel);
    }
};

export default ProductosDAOMongoDB;