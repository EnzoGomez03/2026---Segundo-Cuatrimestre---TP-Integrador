import express from "express";
import * as adminController from "../controllers/adminController.js";
import { validarId } from "../middlewares/validarProducto.js";

const router = express.Router();

router.get("/", adminController.verDashboard);
router.get("/productos/nuevo", adminController.verAlta);
router.get("/productos/:id/editar", validarId, adminController.verEditar);

export default router;
