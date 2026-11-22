const btnContinuar = document.getElementById("btnContinuar");
const btnAdmin = document.getElementById("btnAdmin");

const continuar = () => {
    const nombre = document.getElementById("nombre").value.trim();

    if(nombre === ""){
        alert("Por favor, ingresa tu nombre");
        return;
    }

    localStorage.setItem("nombreCliente", nombre);

    window.location.href = "productos.html";
};

btnContinuar.addEventListener("click",continuar);

btnAdmin.addEventListener("click", () => {
    window.location.href = "/admin/login";
});