import mongoose from 'mongoose';

const UsuariosSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    nombre: {type: String, required: true},
    telefono: {type: Number, required: true},
    direccion: {type: String, required: true},
    admin: {type: Boolean, default:false}
});

const UsuariosMongoDBModel = mongoose.model('Usuarios', UsuariosSchema);

export default UsuariosMongoDBModel;