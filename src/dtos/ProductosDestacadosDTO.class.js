class ProductosDestacadosDTO {
    constructor(id, nombre, marca, precio, foto,oferta){
        this.id = id,
        this.nombre = nombre,
        this.marca = marca,
        this.precio = precio,
        this.foto = foto,
        this.oferta= oferta
    };

    static desdeProductoDAO(productDAO){
        return new ProductosDestacadosDTO(
            productDAO.id,
            productDAO.nombre,
            productDAO.marca,
            productDAO.precio,
            productDAO.foto,
            productDAO.oferta)
    };

    static filtrarOfertas(productDAO){
        return productDAO.filter(producto => producto.oferta === true)
        .map(producto => this.desdeProductoDAO(producto));
    }
};

export default ProductosDestacadosDTO;