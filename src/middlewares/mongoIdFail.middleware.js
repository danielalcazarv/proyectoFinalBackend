const validate = (arg) => {
    if (typeof arg === "string" && arg.length === 12) {
        return true;
    }
    if (typeof arg === "string" && arg.length === 24 && /^[0-9A-Fa-f]+$/.test(arg)) {
        return true;
    }
    if (typeof arg === "number" && Number.isInteger(arg)) {
        return true;
    }
    return false;
};

const mongoFailGetById = (req, res, next) =>{
    const prod = req.params.id;
    const validar = validate(prod);

    if (validar){
        next()
    }else{
        const msj = {
            error:404,
            descripcion:`Not found. El producto no existe. Ruta: ${req.baseUrl}${req.url} || Método: ${req.method}`};
        res.status(404).json(msj);
    }
};

export default mongoFailGetById