document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#btnAccesoRapido").addEventListener("click", () => {
        document.querySelector("#correo").value = "admin@puntogym.com";
        document.querySelector("#contrasenia").value = "123456";
    });

});
