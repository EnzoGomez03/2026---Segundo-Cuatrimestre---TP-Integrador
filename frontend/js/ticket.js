const contenedorTicket = document.getElementById("ticket");
const ventaId = localStorage.getItem("ventaId");
const btnDescargarPdf = document.getElementById
("btnDescargarPdf");
const btnSalir = document.getElementById("btnSalir");

console.log("Venta del ticket:", ventaId);

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
        <div class="ticket-encabezado">
            <h3>PuntoGym</h3>
            <p>Cliente: <strong>${venta.nombreCliente}</strong></p>
            <p>Fecha: ${fechaFormateada}</p>
        </div>

        <h4 class="ticket-titulo-productos">Productos</h4>
    `;

    for(let i = 0; i < venta.Productos.length; i++){
        const producto = venta.Productos[i];
        const cantidad = producto.VentaProducto.cantidad;
        const subtotal = producto.precio * cantidad;

        contenedorTicket.innerHTML += `
            <div class="ticket-producto">
                <div>
                    <strong>${producto.nombre}</strong>
                    <p>$${producto.precio} x ${cantidad}</p>
                </div>

                <strong>$${subtotal}</strong>
            </div>
        `;
    }

    contenedorTicket.innerHTML += `
        <div class="ticket-total">
            <span>Total</span>
            <strong>$${venta.total}</strong>
        </div>

        <p class="ticket-gracias">
            ¡Gracias por comprar en PuntoGym!
        </p>
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