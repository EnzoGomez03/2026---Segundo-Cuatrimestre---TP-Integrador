import { Usuario } from "../models/usuarioModel.js";
import bcrypt from "bcrypt";
import { sesion } from "../middlewares/validarUsuario.js";

export function verLogin(req,res) {
    res.render("login", {
        titulo: "Login",
        error: null
    });
}

export async function login(req,res) {
    const { correo , contrasenia } = req.body;

    if(!correo || !contrasenia){
        return res.status(400).render("login", {
            titulo: "Login",
            error: "El correo y la contrasenia son obligatorios"
        });
    }

    try{
        const usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        });

        if(!usuario){
            return res.status(401).render("login", {
                titulo: "Login",
                error: "El correo o la contrasenia son incorrectos"
            });
        }

        const coincide = await bcrypt.compare(contrasenia, usuario.contrasenia);

        if(!coincide){
            return res.status(401).render("login", {
                titulo: "Login",
                error: "El correo o la contrasenia son incorrectos"
            });
        }

        sesion.logueado = true;

        return res.redirect("/admin");
    }catch (error){

        console.log(error);

        return res.status(500).render("login", {
            titulo: "Login",
            error: "Error al iniciar sesion"
        });
    }
}
