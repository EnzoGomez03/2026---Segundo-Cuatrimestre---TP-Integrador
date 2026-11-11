const btnContinuar = document.getElementById("btnContinuar");

const continuar = () => {
    const nombre = document.getElementById("nombre").value.trim();

    if(nombre ===""){
        alert("Por favor, ingresa tu nombre");
        return;
    }
    alert("Bienvenido a PuntoGym, " + nombre);
};

btnContinuar.addEventListener("click",continuar);