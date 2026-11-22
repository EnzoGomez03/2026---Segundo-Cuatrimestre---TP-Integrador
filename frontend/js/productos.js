const contenedorProductos = document.getElementById("productos");
const btnEquipamiento = document.getElementById("btnEquipamiento");
const btnAccesorios = document.getElementById("btnAccesorios");
const btnTodos = document.getElementById("btnTodos");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const infoPagina = document.getElementById("infoPagina");
const btnVerCarrito = document.getElementById("btnVerCarrito");

let productos = [];
let paginaActual = 1;
let totalPaginas = 1;
let categoriaActual = "Todos";

async function obtenerProductos(pagina){
    
    try {
        const respuesta = await fetch("/api/productos?pagina=" + pagina);
        const datos = await respuesta.json();
        productos = datos.productos;
        paginaActual = datos.pagina;
        totalPaginas = datos.totalPaginas;

        mostrarProductos(productos);
        actualizarPaginacion();
    } catch (error) {
        console.log("Error al obtener los productos:", error);
    }
}

async function obtenerProductosPorCategoria(categoria) {
    try {
        const respuesta = await fetch("/api/productos/categoria/" + categoria);
        const datos = await respuesta.json();

        productos = datos;
        paginaActual = 1;
        totalPaginas = Math.ceil(productos.length / 5);

        mostrarPaginaCategoria();
        actualizarPaginacion();
    } catch (error) {
        console.log("Error al obtener los productos por categoría:", error);
    }
}

function mostrarProductos(productos) {
    contenedorProductos.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        contenedorProductos.innerHTML += `
            <div>
                <img src="/uploads/${producto.imagen}" alt="${producto.nombre}" width="200">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Categoria: ${producto.categoria}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    }
}

function mostrarPaginaCategoria() {
    const limite = 5;
    const inicio = (paginaActual - 1) * limite;
    const fin = inicio + limite;

    const productosPagina = productos.slice(inicio, fin);

    mostrarProductos(productosPagina);
}

function actualizarPaginacion() {
    infoPagina.textContent = "Página " + paginaActual + " de " + totalPaginas;

    btnAnterior.disabled = paginaActual <= 1;
    btnSiguiente.disabled = paginaActual >= totalPaginas;
}

function agregarAlCarrito(id){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let estaba = false;

    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].id === id){
            carrito[i].cantidad++;
            estaba = true;
        }
    }

    if(!estaba){
        for (let i = 0; i < productos.length; i++) {
            if(productos[i].id === id){
                carrito.push({
                    id: productos[i].id,
                    nombre: productos[i].nombre,
                    precio: productos[i].precio,
                    imagen: productos[i].imagen,
                    cantidad: 1
                });
            }
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

btnVerCarrito.addEventListener("click", () => {
    window.location.href = "carrito.html";
});

btnEquipamiento.addEventListener("click", () => {
    categoriaActual = "Equipamiento";
    obtenerProductosPorCategoria(categoriaActual);
});

btnAccesorios.addEventListener("click", () => {
    categoriaActual = "Accesorios";
    obtenerProductosPorCategoria(categoriaActual);
});

btnTodos.addEventListener("click", () => {
    categoriaActual = "Todos";
    obtenerProductos(1);
});

btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;

        if (categoriaActual === "Todos") {
            obtenerProductos(paginaActual);
        } else {
            mostrarPaginaCategoria();
            actualizarPaginacion();
        }
    }
});

btnSiguiente.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
        paginaActual++;

        if (categoriaActual === "Todos") {
            obtenerProductos(paginaActual);
        } else {
            mostrarPaginaCategoria();
            actualizarPaginacion();
        }
    }
});

obtenerProductos(1);