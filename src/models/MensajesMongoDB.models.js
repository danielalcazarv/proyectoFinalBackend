import mongoose from 'mongoose';

const MensajesSchema = mongoose.Schema({
    username: {type: String, required: true},
    type: {type: String, default: 'user'},
    timestamp: {type: Date, default: Date.now},
    mensaje: {type: String, required: true}
});

const MensajesMongoDBModel = mongoose.model('Mensajes', MensajesSchema);

export default MensajesMongoDBModel;