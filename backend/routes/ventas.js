import { Router } from "express";
import { crearVenta, obtenerVentas } from "../controllers/ventasController.js";
import { validarVenta } from "../middlewares/validarVenta.js"
import { generarTicket } from "../controllers/ticketController.js";


const router = Router();

router.post("",validarVenta,crearVenta);
router.get("/", obtenerVentas);

export  default router;