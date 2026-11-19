import { Router } from "express";
import { registrarUsuario } from "../controllers/usuariosController.js";
import { validarUsuario } from "../middlewares/validarUsuario.js";

const router = Router();

router.post("/", validarUsuario, registrarUsuario);

export default router;
