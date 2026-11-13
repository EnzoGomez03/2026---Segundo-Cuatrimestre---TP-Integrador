import express from "express";
import * as inicioController from "../controllers/inicioController.js";

/** Objeto para organizar rutas */
const router = express.Router();

router.get("/", inicioController.mostrarInicio);

export default router;