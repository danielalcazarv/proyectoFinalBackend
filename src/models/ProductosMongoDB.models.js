import mongoose from 'mongoose';

const ProductosSchema = mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    marca: {type: String, required: true, trim: true},
    descripcion: {type: String, required: true, trim: true},
    categoria: {type: String, required: true, trim: true},
    codigo: {type: Number, required: true, trim: true},
    precio: {type: Number, required: true, trim: true},
    foto: {type: String, required: true, trim: true},
    oferta: {type: Boolean, required: true}
});

const ProductosMongoDBModel = mongoose.model('Productos', ProductosSchema);

export default ProductosMongoDBModel;