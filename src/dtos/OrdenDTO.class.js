class OrdenDTO {
    constructor(productos, username, direccion, total, pedido){
        this.productos = productos,
        this.username = username,
        this.direccion = direccion,
        this.total = total,
        this.pedido = pedido
    };

    static desdeCarritoDAO (carritoDAO, user, pedido){
        return new OrdenDTO(
            carritoDAO.productos,
            user.username,
            user.direccion,
            carritoDAO.total,
            pedido
        )
    };

    static pedidoDesdeOrdenDAO (ordenDAO){
        let nroPedido;
        const pedidos = ordenDAO.map((orden) => orden.pedido);
        if (pedidos.length == 0) {
            nroPedido = 1;
            return nroPedido;
        }else {
            nroPedido = pedidos[pedidos.length - 1] + 1;
            return nroPedido;
        }
    };

    static filtrarOrdenesDeUsuario(ordenDAO, user){
        return ordenDAO.filter(orden => orden.username == user.username );
    };

    static filtrarOrden(ordenes, pedido){
        return ordenes.find(orden => orden.pedido == pedido)
    };
};

export default OrdenDTO;