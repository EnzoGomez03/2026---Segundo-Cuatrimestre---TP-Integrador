import PDFDocument from "pdfkit";
import { Venta } from "../models/ventaModel.js";
import { Producto } from "../models/productoModel.js"

export async function generarTicket(req,res) {
    const  id  = req.params.id;

    try{
        const venta = await buscarVenta(id);
        console.log("Productos de la venta:", venta?.Productos);
        if(!venta){
            return res.status(404).json({
                mensaje: "Venta no encontrada"
            });
        }

        const doc = crearPDF(venta);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=ticket-" + venta.id + ".pdf"
        );

        doc.pipe(res);
        doc.end();
    }catch (error){
        console.log(error);
        return res.status(500).json({
            mensaje: "Error al generar el ticket"
        })
    }
}

async function buscarVenta(id) {
    return await Venta.findByPk(id,{
        include: Producto
    });
}

function crearPDF(venta){
    const doc = new PDFDocument();
    
    doc.fontSize(20).text("PuntoGym",{
        align:"center"
    })

    doc.moveDown();

    doc.fontSize(12).text("Ticket N°: " + venta.id);
    doc.text("Cliente: " + venta.nombreCliente);

    const fecha = new Date(venta.fecha);
    doc.text("Fecha: " + fecha.toLocaleDateString("es-AR"))

    agregarProductos(doc,venta);
    agregarTotal(doc,venta);
    return doc;
}

function agregarProductos(doc,venta){
    doc.moveDown();
    doc.fontSize(14).text("Productos comprados:");
    doc.moveDown();
    
    
    for(let i = 0; i < venta.Productos.length ; i++){
        const producto = venta.Productos[i];
        const cantidad = producto.VentaProducto.cantidad;
        const precio = producto.precio;
        const subtotal = precio * cantidad;
        

        doc.fontSize(12).text(producto.nombre + " - Cantidad: " + cantidad);
        doc.text("Precio: $" + precio + " - Subtotal: $" + subtotal);
        
    }
}

function agregarTotal(doc, venta) {
    doc.moveDown();

    doc.fontSize(16).text("Total: $" + venta.total);
}