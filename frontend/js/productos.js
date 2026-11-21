const contenedorProductos = document.getElementById('productos');

async function obtenerProductos(){

    try {
        const respuesta = await fetch('http://localhost:3000/api/productos');
        const datos = await respuesta.json();
        const productos = datos.productos;

        mostrarProductos(productos);
    } catch (error) {
        console.log("Error al obtener los productos:", error);
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
            </div>
        `;
    }
}

obtenerProductos();