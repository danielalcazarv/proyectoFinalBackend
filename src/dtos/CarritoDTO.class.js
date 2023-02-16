class CarritoDTO {
    constructor(id, timestamp, productos, username, direccion){
        this.id = id,
        this.timestamp = timestamp,
        this.productos = productos,
        this.username = username,
        this.direccion = direccion
    };

    static desdeCarritoDAO(carritoDAO, user){ 
        return new CarritoDTO(
            carritoDAO.id,
            carritoDAO.timestamp,
            carritoDAO.productos,
            user.username,
            user.direccion
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