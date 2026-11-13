document.addEventListener("DOMContentLoaded", () => {

    const fondoModal = document.querySelector("#fondoModal");
    const modalTitulo = document.querySelector("#modalTitulo");
    const modalTexto = document.querySelector("#modalTexto");
    const btnConfirmar = document.querySelector("#btnConfirmar");
    const btnCancelar = document.querySelector("#btnCancelar");

    // lo que quedo pendiente de confirmar
    let pendiente = null;

    const abrirModal = (accion, id, nombre) => {
        pendiente = { accion, id };

        if(accion === "desactivar"){
            modalTitulo.innerHTML = "Eliminar producto";
            modalTexto.innerHTML = `Seguro que queres eliminar "${nombre}"? Se va a dejar de mostrar al cliente pero no se borra de la base.`;
            btnConfirmar.className = "btn peligro";
        } else {
            modalTitulo.innerHTML = "Activar producto";
            modalTexto.innerHTML = `Seguro que queres activar "${nombre}"? Va a volver a aparecer del lado del cliente.`;
            btnConfirmar.className = "btn ok";
        }

        fondoModal.classList.add("visible");
    };

    const cerrarModal = () => {
        fondoModal.classList.remove("visible");
        pendiente = null;
    };

    // ====================================================

    document.querySelectorAll("button[data-accion]").forEach(boton => {
        boton.addEventListener("click", () => {
            abrirModal(boton.dataset.accion, boton.dataset.id, boton.dataset.nombre);
        });
    });

    btnCancelar.addEventListener("click", cerrarModal);

    // si clickea afuera del cuadro tambien cierra
    fondoModal.addEventListener("click", (evento) => {
        if(evento.target === fondoModal){
            cerrarModal();
        }
    });

    btnConfirmar.addEventListener("click", async () => {
        if(pendiente === null) return;

        const { accion, id } = pendiente;
        btnConfirmar.disabled = true;

        try {
            const respuesta = await fetch(`/api/productos/${id}/${accion}`, { method: "PATCH" });

            if(!respuesta.ok){
                throw new Error("No se pudo hacer el cambio");
            }

            // recargo asi se ve el estado nuevo en la tabla
            window.location.reload();
        } catch (error) {
            alert(error.message);
            btnConfirmar.disabled = false;
            cerrarModal();
        }
    });

});
