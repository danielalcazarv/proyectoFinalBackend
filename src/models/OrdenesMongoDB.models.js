import mongoose from 'mongoose';

const productosOrden = mongoose.Schema({
    producto: {type: Object},
    cantidad: {type: Number, min:1, default:1},
    subtotal: {type: Number, required: true}
});

const OrdenesSchema = mongoose.Schema({
    productos: {
        type: [productosOrden],
        required: true
    },
    pedido: {type: Number, required:true},
    timestamp: {type: Date, default: Date.now},
    estado: {type: String, required:true, default: 'generada'},
    username: {type: String, required:true},
    direccion: {type: String, required: true},
    total: {type: Number, required: true}
});

const OrdenesMongoDBModel = mongoose.model('Ordenes', OrdenesSchema);

export default OrdenesMongoDBModel;