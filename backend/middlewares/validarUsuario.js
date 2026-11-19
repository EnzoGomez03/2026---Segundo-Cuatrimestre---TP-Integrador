export const sesion = {
    logueado: false
};

export function validarUsuario(req,res,next){
    const { correo , contrasenia } = req.body;

    if(!correo || typeof correo !== "string" || correo.trim() === ""){
        return res.status(400).json({
            mensaje: "El correo es obligatorio"
        });
    }

    if(!correo.includes("@")){
        return res.status(400).json({
            mensaje: "El correo no es valido"
        });
    }

    if(!contrasenia || typeof contrasenia !== "string" || contrasenia.trim() === ""){
        return res.status(400).json({
            mensaje: "La contrasenia es obligatoria"
        });
    }

    next();
}

export function requiereLogin(req,res,next){
    if(!sesion.logueado){
        return res.redirect("/admin/login");
    }

    next();
}
