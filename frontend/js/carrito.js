const contenedorCarrito = document.getElementById("carrito");
const totalCarrito = document.getElementById("total");
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
const modalConfirmar = document.getElementById("modalConfirmar");
const btnConfirmar = document.getElementById("btnConfirmar");
const btnCancelar = document.getElementById("btnCancelar");
const btnVolverProductos = document.getElementById("btnVolverProductos");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito(){
    contenedorCarrito.innerHTML = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        const subtotal = producto.precio * producto.cantidad;

        total = total + subtotal;

        contenedorCarrito.innerHTML += `
            <div>
                <img src="/uploads/${producto.imagen}" alt="${producto.nombre}" width="200">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio} x ${producto.cantidad} = $${subtotal}</p>
                <button onclick="disminuir(${producto.id})">-</button>
                <span>${producto.cantidad}</span>
                <button onclick="aumentar(${producto.id})">+</button>
                <button onclick="eliminar(${producto.id})">Eliminar</button>
            </div>
        `;
    }

    totalCarrito.textContent = "TOTAL: $" + total;
}

function aumentar(id){
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].id === id){
            carrito[i].cantidad++;
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function disminuir(id){
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].id === id && carrito[i].cantidad > 1){
            carrito[i].cantidad--;
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminar(id){
    carrito = carrito.filter(producto => producto.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function prepararProductosVenta(){
    const productosVenta = [];

    for(let i = 0; i < carrito.length; i++){
        productosVenta.push({
            productoId: carrito[i].id,
            cantidad: carrito[i].cantidad
        });
    }

    return productosVenta;
}

async function registrarVenta(venta){
    try {
        const respuesta = await fetch("/api/ventas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(venta)
        });

        const datos = await respuesta.json();

        console.log(datos);
        return datos;

    } catch (error) {
        console.log("Error al registrar la venta:", error);
    }
}

async function finalizarCompra(){
    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }

    const productosVenta = prepararProductosVenta();
    const nombreCliente = localStorage.getItem("nombreCliente");

    const venta = {
        nombreCliente: nombreCliente,
        productos: productosVenta
    };

    const datos = await registrarVenta(venta);
    const ventaId = datos.venta.id;

    localStorage.setItem("ventaId", ventaId);
    console.log("ID de la venta:", ventaId);

    alert(datos.mensaje);
    window.location.href = "ticket.html";
}

function abrirModal(){
    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }

    modalConfirmar.showModal();
}

btnFinalizarCompra.addEventListener("click", abrirModal);
btnCancelar.addEventListener("click", () => {
    modalConfirmar.close();
});

btnConfirmar.addEventListener("click", () => {
    modalConfirmar.close();
    finalizarCompra();
});

btnVolverProductos.addEventListener("click", () => {
    window.location.href = "productos.html";
});

mostrarCarrito();
