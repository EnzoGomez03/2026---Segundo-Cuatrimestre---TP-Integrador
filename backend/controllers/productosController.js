import { Producto } from "../models/productoModel.js";

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

export async function crearProducto(req,res) {
    const producto = await Producto.create(req.body);

    res.json(producto);
}