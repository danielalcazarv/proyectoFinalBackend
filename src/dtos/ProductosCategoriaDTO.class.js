class ProductosCategoriaDTO {
    constructor(id, nombre, marca, precio, foto, categoria, oferta){
        this.id = id,
        this.nombre = nombre,
        this.marca = marca,
        this.precio = precio,
        this.foto = foto,
        this.categoria = categoria,
        this.oferta= oferta
    };

    static desdeProductoDAO(productDAO){
        return new ProductosCategoriaDTO(
            productDAO.id,
            productDAO.nombre,
            productDAO.marca,
            productDAO.precio,
            productDAO.foto,
            productDAO.categoria,
            productDAO.oferta)
    };
    
    static filtrarCategoria(productDAO, categoria){
        return productDAO.filter(producto => producto.categoria == categoria )
        .map(producto => this.desdeProductoDAO(producto));
    }
};

export default ProductosCategoriaDTO;