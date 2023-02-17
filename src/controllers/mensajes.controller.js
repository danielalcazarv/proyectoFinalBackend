import { logger } from '../utils/logger.js';

class MensajesController {
    obtenerMensajes = async (req, res) => {
        try {
            const user = req.user;
            res.render('chat', {user})
        }catch (error){
            logger.error(error);
        }
    };
};

export default MensajesController;