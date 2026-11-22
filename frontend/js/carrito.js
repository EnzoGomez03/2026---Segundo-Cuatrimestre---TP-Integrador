const contenedorCarrito = document.getElementById("carrito");
const totalCarrito = document.getElementById("total");

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

mostrarCarrito();
