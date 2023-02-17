import MensajesDAOFactory from '../classes/MensajesDAOFactory.class.js';
const DAO = MensajesDAOFactory.get();

export const mensajes = async (socket, io) => {
    const getMensajes = await DAO.listarAll();
    const docs = getMensajes;
    socket.emit('mensajes', docs);

    socket.on('new-mensaje', async data =>{
        await DAO.guardar(data);
        const newMsg = await DAO.listarAll()
        io.sockets.emit('mensajes', newMsg);
    })
};