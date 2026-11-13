// categorias del rubro, son las dos unicas que acepta la app
export const CATEGORIAS = ["Accesorios", "Equipamiento"];

export const validarProducto = (req, res, next) => {
    const { nombre, precio, categoria } = req.body;
    const errores = [];

    if(!nombre || nombre.trim() === ""){
        errores.push("El nombre es obligatorio");
    }

    if(precio === undefined || precio === null || precio === ""){
        errores.push("El precio es obligatorio");
    } else if(isNaN(Number(precio)) || Number(precio) <= 0){
        errores.push("El precio tiene que ser un numero mayor a 0");
    }

    if(!categoria || categoria.trim() === ""){
        errores.push("La categoria es obligatoria");
    } else if(!CATEGORIAS.includes(categoria)){
        errores.push(`La categoria tiene que ser ${CATEGORIAS.join(" o ")}`);
    }

    // en el alta la imagen es obligatoria, en la edicion si no manda nada se deja la que ya tenia
    const esAlta = req.method === "POST";
    if(esAlta && !req.file){
        errores.push("Hay que cargar una imagen (jpg, png, webp o gif, hasta 2mb)");
    }

    if(errores.length > 0){
        return res.status(400).json({ errores: errores });
    }

    next();
};

export const validarId = (req, res, next) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({ error: "El id no es valido" });
    }

    req.idProducto = id;
    next();
};
