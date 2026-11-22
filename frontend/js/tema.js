const btnTema = document.getElementById("btnTema");

if(localStorage.getItem("tema") === "oscuro"){
    document.body.classList.add("tema-oscuro");
}

btnTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-oscuro");

    if(document.body.classList.contains("tema-oscuro")){
        localStorage.setItem("tema", "oscuro");
    } else {
        localStorage.setItem("tema", "claro");
    }
});
