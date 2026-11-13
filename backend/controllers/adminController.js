import { Producto } from "../models/productoModel.js";
import { CATEGORIAS } from "../middlewares/validarProducto.js";

// el dashboard muestra TODO, activos e inactivos, por eso no filtra por activo
export async function verDashboard(req, res) {
    const productos = await Producto.findAll({
        order: [["id","ASC"]]
    });

    const accesorios = productos.filter(p => p.categoria === "Accesorios");
    const equipamiento = productos.filter(p => p.categoria === "Equipamiento");

    res.render("dashboard", {
        titulo: "Panel de administracion",
        accesorios: accesorios,
        equipamiento: equipamiento,
        total: productos.length
    });
}

export function verAlta(req, res) {
    res.render("formulario", {
        titulo: "Alta de producto",
        producto: null,
        categorias: CATEGORIAS,
        errores: []
    });
}


export async function verEditar(req, res) {
    const producto = await Producto.findByPk(req.idProducto);

    if(!producto){
        return res.status(404).render("error", {
            titulo: "No encontrado",
            mensaje: "El producto que buscas no existe"
        });
    }

    res.render("formulario", {
        titulo: "Modificar producto",
        producto: producto,
        categorias: CATEGORIAS,
        errores: []
    });
}
