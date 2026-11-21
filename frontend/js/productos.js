const contenedorProductos = document.getElementById('contenedor-productos');

async function obtenerProductos(){

    try {
        const respuesta = await fetch('http://localhost:3000/api/productos');
        const datos = await respuesta.json();
        console.log(datos);
    } catch (error) {
        console.log("Error al obtener los productos:", error);
    }
}

obtenerProductos();