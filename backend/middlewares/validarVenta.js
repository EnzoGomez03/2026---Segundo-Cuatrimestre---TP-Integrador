export function validarVenta(req,res,next){
    const { nombreCliente , productos} = req.body;

    if(!nombreCliente || typeof nombreCliente !== "string" || nombreCliente.trim() === ""){
        return res.status(400).json({
            mensaje: "El nombre del cliente es obligatorio"
        })
    }

    if(!Array.isArray(productos) || productos.length === 0){
        return res.status(400).json({
            mensaje: "Debe seleccionar al menos un producto"
        });
    }
    if(!validarCantidades(productos)){
        return  res.status(400).json({
            mensaje: "Las cantidades deben ser numeros enteros mayores a cero"
        });
    }
    if(!validarIds(productos)){
        return res.status(400).json({
            mensaje: "Los IDs de los productos deben ser numeros enteros mayores a cero"
        });
    }
    next();
}

function validarCantidades(productos) {
    for (let i = 0; i < productos.length; i++) {
        const cantidad = productos[i]?.cantidad;

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return false;
        }
    }

    return true;
}

function validarIds(productos){
    for(let i = 0 ; i < productos.length; i++){
        const productoId = productos[i]?.productoId;

        if(!Number.isInteger(productoId) || productoId <= 0){
            return false;
        }
    }
    return true;
}