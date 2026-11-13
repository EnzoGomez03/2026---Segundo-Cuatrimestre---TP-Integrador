document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector("#formProducto");
    const cajaErrores = document.querySelector("#cajaErrores");

    const mostrarErrores = (lista) => {
        cajaErrores.innerHTML = lista.map(e => `<p>${e}</p>`).join("");
        cajaErrores.classList.add("visible");
    };

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        cajaErrores.classList.remove("visible");

        const datos = new FormData(formulario);

        // si estamos editando y no eligio archivo, no mando el campo vacio
        const archivo = document.querySelector("#imagen").files[0];
        if(!archivo){
            datos.delete("imagen");
        }

        const esEdicion = idProducto !== null;
        const url = esEdicion ? `/api/productos/${idProducto}` : "/api/productos";
        const metodo = esEdicion ? "PUT" : "POST";

        try {
            const respuesta = await fetch(url, { method: metodo, body: datos });
            const resultado = await respuesta.json();

            if(!respuesta.ok){
                mostrarErrores(resultado.errores || [resultado.error || "Algo salio mal"]);
                return;
            }

            window.location.href = "/admin";
        } catch (error) {
            mostrarErrores(["No se pudo conectar con el servidor"]);
        }
    });

});
