import { Producto } from "../models/productoModel.js";
import fs from "fs";
import path from "path";

export async function obtenerProductos(req,res){
    const pagina = Number(req.query.pagina) || 1;
    const limite = 5;
    const offset = (pagina - 1) * limite;


    const productos = await Producto.findAll({
        where: {
            activo : true
        },
        limit: limite,
        offset: offset,
        order: [["id","ASC"]]
    });

    const total = await Producto.count({
        where:{
            activo:true
        }
    })
    const totalPaginas = Math.ceil(total / limite);

    res.json({
        productos: productos,
        pagina: pagina,
        totalPaginas: totalPaginas,
        total: total
    });
};

export async function obtenerProductosPorId(req, res) {
    const id = Number(req.params.id);

    const producto = await Producto.findByPk(id);

    res.json(producto);
}

//=================================================

export async function crearProducto(req,res) {
    try {
        const { nombre, precio, categoria } = req.body;

        const producto = await Producto.create({
            nombre: nombre.trim(),
            precio: Number(precio),
            categoria: categoria,
            imagen: req.file.filename,
            activo: true            // arranca activo siempre, lo pide la consigna
        });

        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: "No se pudo crear el producto" });
    }
}

// modificacion. si no mandan imagen nueva se queda con la vieja
export async function actualizarProducto(req, res) {
    try {
        const producto = await Producto.findByPk(req.idProducto);

        if(!producto){
            return res.status(404).json({ error: "No existe ese producto" });
        }

        const { nombre, precio, categoria } = req.body;
        const imagenVieja = producto.imagen;

        producto.nombre = nombre.trim();
        producto.precio = Number(precio);
        producto.categoria = categoria;

        if(req.file){
            producto.imagen = req.file.filename;
        }

        await producto.save();

        // si cambio la imagen borro la de antes asi no quedan archivos al azar en uploads
        if(req.file && imagenVieja && imagenVieja !== req.file.filename){
            borrarImagen(imagenVieja);
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: "No se pudo modificar el producto" });
    }
}


// baja logica, el producto NO se borra de la base, solo se apaga
export async function desactivarProducto(req, res) {
    try {
        const producto = await Producto.findByPk(req.idProducto);

        if(!producto){
            return res.status(404).json({ error: "No existe ese producto" });
        }

        producto.activo = false;
        await producto.save();

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: "No se pudo desactivar el producto" });
    }
}

export async function activarProducto(req, res) {
    try {
        const producto = await Producto.findByPk(req.idProducto);

        if(!producto){
            return res.status(404).json({ error: "No existe ese producto" });
        }

        producto.activo = true;
        await producto.save();

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: "No se pudo activar el producto" });
    }
}

//=========== auxiliar ===========
function borrarImagen(nombreArchivo){
    const ruta = path.join("uploads", nombreArchivo);
    fs.unlink(ruta, () => {
        // si no esta no pasa nada, no me interesa el error aca
    });
}
