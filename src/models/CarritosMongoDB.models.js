import mongoose from 'mongoose';

const productosCart = mongoose.Schema({
    producto: {type: Object},
    cantidad: {type: Number, min:1, default:1}
})

const CarritosMongoDBModel = mongoose.model('Carritos', {
    timestamp: {type: Date, default: Date.now},
    username: {type: String, required:true},
    direccion: {type: String, required: true},
    productos: {
        type: [productosCart],
        required: true
    }
});

export default CarritosMongoDBModel;