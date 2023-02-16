import { logger } from "../utils/logger.js"

class CarritoDTO {
    constructor(id, timestamp, productos, username){
        this.id = id,
        this.timestamp = timestamp,
        this.productos = productos,
        this.username = username
    };

    static desdeCarritoDAO(carritoDAO, user){ //si agrego más datos como UsuarioDao.Tel me debería servir para las orders
        return new CarritoDTO(
            carritoDAO.id,
            carritoDAO.timestamp,
            carritoDAO.productos,
            user.username
            )
    };

    static getCarritoDeUser(carritoDAO, user){
        return carritoDAO.find(carrito => carrito.username === user.username);
    };
};

export default CarritoDTO;