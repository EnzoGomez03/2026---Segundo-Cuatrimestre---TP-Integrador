import { Usuario } from "../models/usuarioModel.js";
import bcrypt from "bcrypt";

export async function registrarUsuario(req,res) {
    const { correo , contrasenia } = req.body;

    try{
        const contraseniaCifrada = await bcrypt.hash(contrasenia, 10);

        const usuario = await Usuario.create({
            correo: correo,
            contrasenia: contraseniaCifrada
        });

        return res.status(201).json({
            mensaje: "Administrador registrado correctamente",
            usuario: {
                id: usuario.id,
                correo: usuario.correo
            }
        });
    }catch (error){

        console.log(error);

        return res.status(500).json({
            mensaje: "Error al registrar el administrador"
        });
    }
}
