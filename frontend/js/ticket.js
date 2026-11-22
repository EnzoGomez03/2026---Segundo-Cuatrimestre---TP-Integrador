const ventaId = localStorage.getItem("ventaId");

console.log("Venta del ticket:", ventaId);

async function obtenerVenta(){
    try{
        const respuesta = await fetch("/api/ventas/" + ventaId);
        const venta = await respuesta.json();

        console.log(venta);

    }catch(error){
        console.log("Error al obtener la venta:", error);
    }
}

obtenerVenta();