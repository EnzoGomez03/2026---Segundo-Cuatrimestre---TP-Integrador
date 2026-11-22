import { Router } from "express";
import { crearVenta, obtenerVentas, obtenerVentaPorId } from "../controllers/ventasController.js";
import { validarVenta } from "../middlewares/validarVenta.js"
import { generarTicket } from "../controllers/ticketController.js";


const router = Router();

router.post("",validarVenta,crearVenta);
router.get("/", obtenerVentas);
router.get("/:id", obtenerVentaPorId);

export  default router;