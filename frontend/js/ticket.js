const contenedorTicket = document.getElementById("ticket");
const ventaId = localStorage.getItem("ventaId");
const btnDescargarPdf = document.getElementById
("btnDescargarPdf");
const btnSalir = document.getElementById("btnSalir");

console.log("Venta del ticket:", ventaId);

btnDescargarPdf.addEventListener("click", () => {
    window.location.href = "/ventas/" + ventaId + "/ticket";
});

async function obtenerVenta(){
    try{
        const respuesta = await fetch("/api/ventas/" + ventaId);
        const venta = await respuesta.json();

        console.log(venta);
        mostrarTicket(venta);

    }catch(error){
        console.log("Error al obtener la venta:", error);
    }
}

function mostrarTicket(venta){
    const fecha = new Date(venta.fecha);
    const fechaFormateada = fecha.toLocaleDateString("es-AR");

    contenedorTicket.innerHTML = `
        <h3>PuntoGym</h3>
        <p>Cliente: ${venta.nombreCliente}</p>
        <p>Fecha: ${fechaFormateada}</p>
        <h4>Productos</h4>
    `;

    for(let i = 0; i < venta.Productos.length; i++){
        const producto = venta.Productos[i];
        const cantidad = producto.VentaProducto.cantidad;
        const subtotal = producto.precio * cantidad;

        contenedorTicket.innerHTML += `
            <div>
                <p>Producto: ${producto.nombre}</p>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${cantidad}</p>
                <p>Subtotal: $${subtotal}</p>
            </div>
        `;
    }

    contenedorTicket.innerHTML += `
        <h3>Total: $${venta.total}</h3>
    `;
}

btnDescargarPdf.addEventListener("click", () => {
    window.location.href = "/ventas/" + ventaId + "/ticket";
});
btnSalir.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("nombreCliente");
    localStorage.removeItem("ventaId");

    window.location.href = "/";
});

obtenerVenta();