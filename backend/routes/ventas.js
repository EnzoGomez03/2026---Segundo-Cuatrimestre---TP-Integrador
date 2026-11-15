import { Router } from "express";
import { crearVenta } from "../controllers/ventasController.js";
import { validarVenta } from "../middlewares/validarVenta.js"


const router = Router();

router.post("",validarVenta,crearVenta);

export  default router;