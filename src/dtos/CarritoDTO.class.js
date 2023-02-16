import { logger } from "../utils/logger.js"

class CarritoDTO {
    constructor(id, timestamp, productos, username){
        this.id = id,
        this.timestamp = timestamp,
        this.productos = productos,
        this.username = username
    };

    static desdeCarritoDAO(carritoDAO, user){ 
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

    static prodRepetido( newProd, carrito){
        const productos = carrito.productos;
        const indice = productos.findIndex(p => p.producto.id === newProd.producto.id);
        if (indice === -1){
            productos.push(newProd);
        }else{
            productos[indice].cantidad += newProd.cantidad
        };
        return carrito;
    };

    static eliminarProducto( carrito, productoId) {
        carrito.productos = carrito.productos.filter((producto)=> producto.producto.id !== productoId);
        return carrito;
    }
};

export default CarritoDTO;