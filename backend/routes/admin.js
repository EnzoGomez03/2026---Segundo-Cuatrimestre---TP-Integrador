import express from "express";
import * as adminController from "../controllers/adminController.js";
import { verLogin, login } from "../controllers/authController.js";
import { validarId } from "../middlewares/validarProducto.js";
import { requiereLogin } from "../middlewares/validarUsuario.js";

const router = express.Router();

router.get("/login", verLogin);
router.post("/login", login);

router.get("/", requiereLogin, adminController.verDashboard);
router.get("/productos/nuevo", requiereLogin, adminController.verAlta);
router.get("/productos/:id/editar", requiereLogin, validarId, adminController.verEditar);

export default router;
