import { Venta } from "../models/ventaModel.js";
import{ Producto } from "../models/productoModel.js"
import { VentaProducto } from "../models/ventaProductoModel.js";
import { sequelize } from "../models/db.js";

export async function crearVenta(req,res) {
    //Aca estamos destructurando el req.body
    const { nombreCliente , productos} = req.body;

    let total = await calcularTotal(productos);
    if(total === null){
        return res.status(404).json({
            mensaje: "Producto no encontrados"
        });
    }

    try{
        const venta = await guardarVenta(nombreCliente,productos,total);

        return res.status(201).json({
            mensaje: "Venta registrada correctamente",
            venta: venta
        });
    } catch (error){

        console.log(error);

        return res.status(500).json({
            mensaje: "Error al registrar la venta"
        })
    }

};


async function calcularTotal(productos){
    let total = 0;

    for(let i = 0 ; i < productos.length; i++){
        const productoId = productos[i].productoId;
        const cantidad = productos[i].cantidad;

        const producto = await Producto.findOne({
            where: {
                id: productoId,
                activo: true
            }
        })

        if(!producto){
            return null
        }
        
        total = total + (producto.precio * cantidad);
    }

    return total;
}


async function guardarProductosVenta(venta, productos,transaccion){
    for(let i = 0 ; i < productos.length; i++){
        await VentaProducto.create({
            VentumId: venta.id,
            ProductoId: productos[i].productoId,
            cantidad: productos[i].cantidad
        },{
            transaction: transaccion
        })
    }
}


async function guardarVenta(nombreCliente,productos,total) {
    const transaccion = await sequelize.transaction();

    try{
        const venta = await Venta.create({
            nombreCliente: nombreCliente,
            total: total
        },{
            transaction: transaccion
        });

        await guardarProductosVenta(venta,productos,transaccion)
        await transaccion.commit();
        return venta;

    }catch (error){
        await transaccion.rollback();
        throw error;
    }
}

export async function obtenerVentas(req,res) {
    try{
        const ventas = await Venta.findAll({
            include: Producto
        });
        return res.status(200).json(ventas);
    }catch (error){
        console.log(error);

        return res.status(500).json({
            mensaje:"Error al obtener las ventas"
        });
    }
}